enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: boolean;
  role: UserRole;
  phone: string;
  profileImage: string;
  cart: ICart[];
  favourited: string[];
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "inactive";
  totalSpent: number;
  orders: [];
}
export interface ICart {
  _id: string;
  productId: string;
  quantity: number;
}
