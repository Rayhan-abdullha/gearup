import { prisma } from "../../lib/prisma";
const createGear = async (payload) => {
    const { title, description, brand, specifications, pricePerDay, stock = 1, providerId, categoryId, } = payload;
    if (!title ||
        !description ||
        !brand ||
        !pricePerDay ||
        !providerId ||
        !categoryId) {
        throw new Error("Missing required fields");
    }
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    const newGear = await prisma.gear.create({
        data: {
            title,
            description,
            brand,
            specifications,
            pricePerDay,
            stock,
            providerId,
            categoryId,
        },
    });
    return {
        ...newGear,
    };
};
const updateGear = async (gearId, providerId, payload) => {
    if (!gearId) {
        throw new Error("Gear ID is required");
    }
    const existingGear = await prisma.gear.findUnique({
        where: { id: gearId },
    });
    if (!existingGear) {
        throw new Error("Gear listing not found");
    }
    if (existingGear.providerId !== providerId) {
        throw new Error("Unauthorized to modify this gear listing");
    }
    return await prisma.gear.update({
        where: { id: gearId },
        data: payload,
    });
};
const deleteGear = async (gearId, providerId) => {
    if (!gearId) {
        throw new Error("Gear ID is required");
    }
    const existingGear = await prisma.gear.findUnique({
        where: { id: gearId },
    });
    if (!existingGear) {
        throw new Error("Gear listing not found");
    }
    if (existingGear.providerId !== providerId) {
        throw new Error("Unauthorized to remove this gear listing");
    }
    return await prisma.gear.delete({
        where: { id: gearId },
    });
};
const getGearOrders = async (providerId) => {
    return await prisma.order.findMany({
        where: {
            items: {
                some: {
                    gear: {
                        providerId: providerId,
                    },
                },
            },
        },
        include: {
            customer: {
                select: { id: true, name: true, email: true },
            },
            items: {
                where: {
                    gear: { providerId: providerId },
                },
                include: {
                    gear: true,
                },
            },
            payment: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
const updateGearOrder = async (orderId, providerId, status) => {
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
            gear: { providerId },
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
const createCategory = async (payload) => {
    const { name, slug, description } = payload;
    if (!name || !slug) {
        throw new Error("Name and slug are required");
    }
    const newCategory = await prisma.category.create({
        data: {
            name,
            slug: slug,
            description,
        },
    });
    return {
        ...newCategory,
    };
};
const getCategories = async () => {
    const categories = await prisma.category.findMany();
    return categories;
};
export const providerServices = {
    createGear,
    createCategory,
    getCategories,
    updateGear,
    deleteGear,
    getGearOrders,
    updateGearOrder,
};
//# sourceMappingURL=provider.services.js.map