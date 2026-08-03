import { prisma } from "../../lib/prisma";
const createGear = async (payload) => {
    const { title, description, brand, specifications, pricePerDay, stock = 1, images = [], providerId, categoryId, } = payload;
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
    if (!images || images.length === 0) {
        images.push("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop");
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
            images,
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
    const updatedGear = {
        id: existingGear.id,
        title: payload.title ?? existingGear.title,
        description: payload.description ?? existingGear.description,
        brand: payload.brand ?? existingGear.brand,
        specifications: payload.specifications ?? existingGear.specifications,
        pricePerDay: payload.pricePerDay ?? existingGear.pricePerDay,
        stock: payload.stock ?? existingGear.stock,
        isAvailable: payload.isAvailable ?? existingGear.isAvailable,
        providerId: existingGear.providerId,
        categoryId: payload.categoryId ?? existingGear.categoryId,
        images: payload.images ?? existingGear.images,
    };
    return await prisma.gear.update({
        where: { id: gearId },
        data: updatedGear,
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
    if (!status) {
        throw new Error("Status is required");
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
        if (status === "CONFIRMED" ||
            status === "PICKED_UP" ||
            status === "CANCELLED") {
            const updatedOrder = await tx.order.update({
                where: { id: orderId },
                data: { status },
            });
            return updatedOrder;
        }
        // if cancell increment stock
        if (status === "CANCELLED") {
            const updatedOrder = await tx.order.update({
                where: { id: orderId },
                data: { status },
            });
            await tx.gear.update({
                where: { id: matchingOrderItem.gearId },
                data: {
                    stock: {
                        increment: matchingOrderItem.quantity,
                    },
                },
            });
            return updatedOrder;
        }
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
const getProviderOverview = async (providerId) => {
    const result = await prisma.$transaction(async (tx) => {
        const totalGearListed = await tx.gear.count({
            where: { providerId },
        });
        const activeRentals = await tx.order.count({
            where: {
                status: "PLACED",
                items: {
                    some: {
                        gear: {
                            providerId,
                        },
                    },
                },
            },
        });
        const pendingOrders = await tx.order.count({
            where: {
                status: "PENDING",
                items: {
                    some: {
                        gear: {
                            providerId,
                        },
                    },
                },
            },
        });
        const revenue = await tx.order.aggregate({
            _sum: {
                totalAmount: true,
            },
            where: {
                status: "RETURNED",
                items: {
                    some: {
                        gear: {
                            providerId,
                        },
                    },
                },
            },
        });
        // recent orders
        const orders = await tx.order.findMany({
            where: {
                items: {
                    some: {
                        gear: {
                            providerId,
                        },
                    },
                },
            },
            include: {
                customer: {
                    select: { id: true, name: true },
                },
            },
            orderBy: { createdAt: "desc" },
            take: 5,
        });
        return {
            totalGearListed,
            activeRentals,
            pendingOrders,
            revenue,
            recentOrders: orders,
        };
    });
    return result;
};
export const providerServices = {
    createGear,
    createCategory,
    getCategories,
    updateGear,
    deleteGear,
    getGearOrders,
    updateGearOrder,
    getProviderOverview,
};
//# sourceMappingURL=provider.services.js.map