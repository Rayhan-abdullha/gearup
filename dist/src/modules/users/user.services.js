import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
const registerUserIntoDB = async (payload) => {
    const { name, email, password, role } = payload;
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            profile: {
                create: {},
            },
        },
    });
    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email,
        },
        omit: {
            password: true,
        },
    });
    return user;
};
const getMyProfileFromDB = async (userId) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        omit: {
            password: true,
        },
        include: {
            profile: true,
        },
    });
    return user;
};
const updateMyProfileInDB = async (userId, payload) => {
    const { name, phoneNumber, avatarUrl, bio, deliveryAddress, city, postalCode, shopName, shopAddress, payoutDetails, } = payload;
    if (name) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                name,
            },
        });
    }
    const userProfile = await prisma.profile.findUnique({
        where: { userId: userId },
    });
    const updatedInfo = {
        phoneNumber: phoneNumber || userProfile?.phoneNumber,
        avatarUrl: avatarUrl || userProfile?.avatarUrl,
        bio: bio || userProfile?.bio,
        deliveryAddress: deliveryAddress || userProfile?.deliveryAddress,
        city: city || userProfile?.city,
        postalCode: postalCode || userProfile?.postalCode,
        shopName: shopName || userProfile?.shopName,
        shopAddress: shopAddress || userProfile?.shopAddress,
        payoutDetails: payoutDetails || userProfile?.payoutDetails,
    };
    const updatedUser = await prisma.profile.update({
        where: { userId: userId },
        data: {
            ...updatedInfo,
        },
    });
    return updatedUser;
};
export const userService = {
    registerUserIntoDB,
    getMyProfileFromDB,
    updateMyProfileInDB,
};
//# sourceMappingURL=user.services.js.map