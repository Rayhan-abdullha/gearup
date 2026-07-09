import { prisma } from "../../lib/prisma";
import { UserStatus } from "./admin.interface";
const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      profile: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateUserStatus = async (userId: string, status: UserStatus) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (status !== "ACTIVE" && status !== "SUSPENDED") {
    throw new Error("Invalid status type. Must be 'ACTIVE' or 'SUSPENDED'.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Target user account not found");
  }

  if (user.role === "ADMIN") {
    throw new Error("Administrative platform accounts cannot be suspended");
  }

  return await prisma.user.update({
    where: { id: userId },
    data: { status },
    select: { id: true, email: true, name: true, role: true, status: true },
  });
};

const getAllGears = async () => {
  return await prisma.gear.findMany({
    include: {
      category: {
        select: { name: true, slug: true },
      },
      provider: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getAllRentals = async () => {
  return await prisma.order.findMany({
    include: {
      customer: {
        select: { name: true, email: true },
      },
      items: {
        include: {
          gear: {
            select: { title: true, brand: true, pricePerDay: true },
          },
        },
      },
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const adminServices = {
  getAllUsers,
  updateUserStatus,
  getAllGears,
  getAllRentals,
};
