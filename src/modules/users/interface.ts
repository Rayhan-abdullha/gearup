enum Role {
  CUSTOMER = "CUSTOMER",
  PROVIDER = "PROVIDER",
  ADMIN = "ADMIN",
}
export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface profileUpdateDTO {
  name?: string;
  email?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  bio?: string;
  deliveryAddress?: string;
  city?: string;
  postalCode?: string;
  shopName?: string;
  shopAddress?: string;
  payoutDetails?: any;
}
