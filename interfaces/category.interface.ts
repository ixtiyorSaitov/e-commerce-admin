export interface ICategory {
  _id: string;
  description: string;
  status: "active";
  productCount: number;
  slug: string;
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}
