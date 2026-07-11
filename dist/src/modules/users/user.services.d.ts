import { profileUpdateDTO, RegisterUserPayload } from "./user.interface";
export declare const userService: {
    registerUserIntoDB: (payload: RegisterUserPayload) => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getMyProfileFromDB: (userId: string) => Promise<{
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            phoneNumber: string | null;
            avatarUrl: string | null;
            bio: string | null;
            deliveryAddress: string | null;
            city: string | null;
            postalCode: string | null;
            shopName: string | null;
            shopAddress: string | null;
            payoutDetails: import("@prisma/client/runtime/client").JsonValue | null;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMyProfileInDB: (userId: string, payload: profileUpdateDTO) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string | null;
        avatarUrl: string | null;
        bio: string | null;
        deliveryAddress: string | null;
        city: string | null;
        postalCode: string | null;
        shopName: string | null;
        shopAddress: string | null;
        payoutDetails: import("@prisma/client/runtime/client").JsonValue | null;
        userId: string;
    }>;
};
//# sourceMappingURL=user.services.d.ts.map