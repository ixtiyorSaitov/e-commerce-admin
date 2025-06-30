import { ECategoriesSlug } from "@/lib/categories";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  oldPrice?: number;
  isOriginal?: boolean;
  slug: string;
  images: string[];
  categories: ECategoriesSlug[];
}
