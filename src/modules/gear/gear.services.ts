import { IGearFilters } from "./gear.interface";
import { prisma } from "../../lib/prisma";

const getAllGears = async (filters: IGearFilters) => {
  const {
    searchTerm,
    categoryId,
    categoryName,
    brand,
    minPrice,
    maxPrice,
    isAvailable,
  } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { brand: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ],
    });
  }
  if (categoryId) {
    andConditions.push({ categoryId });
  }

  if (categoryName) {
    andConditions.push({
      category: {
        slug: {
          equals: categoryName.toLowerCase(),
          mode: "insensitive",
        },
      },
    });
  }

  if (brand) {
    andConditions.push({
      brand: { equals: brand, mode: "insensitive" },
    });
  }
  if (isAvailable !== undefined) {
    andConditions.push({
      isAvailable: isAvailable === "true",
    });
  }
  if (minPrice || maxPrice) {
    const priceCondition: Record<string, number> = {};

    if (minPrice) priceCondition.gte = parseFloat(minPrice);
    if (maxPrice) priceCondition.lte = parseFloat(maxPrice);

    andConditions.push({ pricePerDay: priceCondition });
  }

  // Combine conditions into final query constraint layout
  const whereConditions: Record<string, any> =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const gears = await prisma.gear.findMany({
    where: whereConditions,
    include: {
      category: {
        select: { name: true, slug: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return gears;
};

const getSingleGear = async (gearId: string) => {
  if (!gearId) {
    throw new Error("Gear ID is required");
  }
  const gear = await prisma.gear.findUnique({
    where: { id: gearId },
    include: {
      category: true,
      reviews: true,
    },
  });
  if (!gear) {
    throw new Error("Gear not found");
  }

  return gear;
};

const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const gearServices = {
  getAllGears,
  getCategories,
  getSingleGear,
};
