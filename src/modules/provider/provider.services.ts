import { IGear, ICategory } from "./provider.interface";
import { prisma } from "../../lib/prisma";

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

const updateGear = async (
  gearId: string,
  providerId: string,
  payload: Partial<IGear>,
) => {
  // 1. Verify the gear exists and belongs to the requesting provider
  const existingGear = await prisma.gear.findUnique({
    where: { id: gearId },
  });

  if (!existingGear) {
    throw new Error("Gear not found");
  }

  if (existingGear.providerId !== providerId) {
    throw new Error("Unauthorized to update this gear");
  }

  // 2. Optional: If categoryId is being updated, verify the new category exists
  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: payload.categoryId },
    });
    if (!category) {
      throw new Error("Category not found");
    }
  }

  // 3. Perform the update
  const updatedGear = await prisma.gear.update({
    where: { id: gearId },
    data: payload,
  });

  return updatedGear;
};

const deleteGear = async (gearId: string, providerId: string) => {
  // 1. Verify the gear exists and belongs to the provider
  const existingGear = await prisma.gear.findUnique({
    where: { id: gearId },
  });

  if (!existingGear) {
    throw new Error("Gear not found");
  }

  if (existingGear.providerId !== providerId) {
    throw new Error("Unauthorized to delete this gear");
  }

  // 2. Delete the gear
  await prisma.gear.delete({
    where: { id: gearId },
  });

  return { id: gearId };
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
};
