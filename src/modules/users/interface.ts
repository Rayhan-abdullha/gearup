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
