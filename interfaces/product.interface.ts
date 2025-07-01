export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  isOriginal?: boolean;
  slug: string;
  images: string[];
  categories: string[];
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
}
