import { IGearFilters } from "./gear.interface";
import { prisma } from "../../lib/prisma";

const getAllGears = async (filters: IGearFilters) => {
  const {
    searchTerm,
    categoryId,
    category,
    brand,
    minPrice,
    maxPrice,
    isAvailable,
  } = filters;

  const andConditions: any[] = [];

  // Search
  if (searchTerm?.trim()) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchTerm.trim(),
            mode: "insensitive",
          },
        },
        {
          brand: {
            contains: searchTerm.trim(),
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm.trim(),
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (categoryId) {
    andConditions.push({
      categoryId,
    });
  }

  if (typeof category === "string") {
    andConditions.push({
      category: {
        name: {
          equals: category,
          mode: "insensitive",
        },
      },
    });
  } else if (category?.length) {
    andConditions.push({
      category: {
        name: {
          in: category,
          mode: "insensitive",
        },
      },
    });
  }

  if (brand && typeof brand === "string") {
    andConditions.push({
      brand: {
        equals: brand,
        mode: "insensitive",
      },
    });
  } else if (brand?.length) {
    andConditions.push({
      OR: brand.map((item: string) => ({
        brand: {
          equals: item,
          mode: "insensitive",
        },
      })),
    });
  }

  if (isAvailable !== undefined) {
    andConditions.push({
      isAvailable: isAvailable === "true",
    });
  }

  // Price range
  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceCondition: Record<string, number> = {};

    if (minPrice !== undefined) {
      priceCondition.gte = Number(minPrice);
    }

    if (maxPrice !== undefined) {
      priceCondition.lte = Number(maxPrice);
    }

    andConditions.push({
      pricePerDay: priceCondition,
    });
  }

  const where =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const gears = await prisma.gear.findMany({
    where,
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
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
