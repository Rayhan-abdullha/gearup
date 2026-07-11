import { IGear, ICategory } from "./provider.interface";
import { prisma } from "../../lib/prisma";
import { OrderStatus } from "./provider.interface";

const createGear = async (payload: IGear) => {
  const {
    title,
    description,
    brand,
    specifications,
    pricePerDay,
    stock = 1,
    providerId,
    categoryId,
  } = payload;

  if (
    !title ||
    !description ||
    !brand ||
    !pricePerDay ||
    !providerId ||
    !categoryId
  ) {
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
const updateGear = async (gearId: string, providerId: string, payload: any) => {
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

const deleteGear = async (gearId: string, providerId: string) => {
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

const getGearOrders = async (providerId: string) => {
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

const updateGearOrder = async (
  orderId: string,
  providerId: string,
  status: OrderStatus,
) => {
  if (!orderId) {
    throw new Error("Order ID is required");
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

  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};
const createCategory = async (payload: ICategory) => {
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
