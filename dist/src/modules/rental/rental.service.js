import { prisma } from "../../lib/prisma";
const createRentalOrder = async (userId, payload) => {
    if (!payload.items || payload.items.length === 0) {
        throw new Error("Rental items are required to place an order");
    }
    return await prisma.$transaction(async (tx) => {
        let calculatedTotalAmount = 0;
        const orderItemsData = [];
        for (const item of payload.items) {
            const gear = await tx.gear.findUnique({
                where: { id: item.gearId },
            });
            if (!gear) {
                throw new Error(`Gear item with ID ${item.gearId} not found`);
            }
            if (!gear.isAvailable || gear.stock < item.quantity) {
                throw new Error(`Selected quantity for "${gear.title}" is unavailable`);
            }
            const start = new Date(item.startDate);
            const end = new Date(item.endDate);
            const timeDifference = end.getTime() - start.getTime();
            const rentalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            if (rentalDays <= 0) {
                throw new Error(`Invalid rental dates for item ${gear.title}. End date must be after start date.`);
            }
            const itemCost = gear.pricePerDay * item.quantity * rentalDays;
            calculatedTotalAmount += itemCost;
            orderItemsData.push({
                gearId: item.gearId,
                quantity: item.quantity,
                priceAtRent: gear.pricePerDay,
                startDate: start,
                endDate: end,
            });
        }
        const newOrder = await tx.order.create({
            data: {
                customerId: userId,
                totalAmount: calculatedTotalAmount,
                status: "PENDING",
                paymentStatus: "PENDING",
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: true,
            },
        });
        return newOrder;
    });
};
const getUserRentals = async (userId) => {
    const rentals = await prisma.order.findMany({
        where: { customerId: userId },
        include: {
            items: {
                include: {
                    gear: {
                        select: { title: true, brand: true },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return rentals;
};
const getRentalDetails = async (orderId, userId) => {
    if (!orderId) {
        throw new Error("Order ID is required");
    }
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: {
                include: {
                    gear: true,
                },
            },
            payment: true,
        },
    });
    if (!order) {
        throw new Error("Rental order not found");
    }
    // Authorization Guard: Prevent other customers from viewing this invoice order
    if (order.customerId !== userId) {
        throw new Error("Unauthorized to access this rental order");
    }
    return order;
};
const updateRentalOrder = async (orderId, customerId, status) => {
    if (!orderId) {
        throw new Error("Order ID is required");
    }
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
    });
    if (!order) {
        throw new Error("Order not found");
    }
    const matchingOrderItem = await prisma.orderItem.findFirst({
        where: {
            orderId,
            order: {
                customerId,
            },
        },
    });
    if (!matchingOrderItem) {
        throw new Error("Unauthorized to update status for this rental request");
    }
    if (order.status === "RETURNED") {
        throw new Error("This order has already been returned and closed out.");
    }
    return await prisma.$transaction(async (tx) => {
        if (status === "RETURNED") {
            for (const item of order.items) {
                await tx.gear.update({
                    where: { id: item.gearId },
                    data: {
                        stock: {
                            increment: item.quantity,
                        },
                    },
                });
            }
        }
        // Update and return the final order status
        const updatedOrder = await tx.order.update({
            where: { id: orderId },
            data: { status },
        });
        return updatedOrder;
    });
};
export const rentalServices = {
    createRentalOrder,
    getUserRentals,
    getRentalDetails,
    updateRentalOrder,
};
//# sourceMappingURL=rental.service.js.map