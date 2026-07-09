import { IGear, ICategory } from "./gear.interface";
import { prisma } from "../../lib/prisma";

const getAllGears = async () => {
  const gears = await prisma.gear.findMany();
  return gears;
};

const getSingleGear = async (gearId: string) => {
  if (!gearId) {
    throw new Error("Gear ID is required");
  }
  const gear = await prisma.gear.findUnique({
    where: { id: gearId },
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
