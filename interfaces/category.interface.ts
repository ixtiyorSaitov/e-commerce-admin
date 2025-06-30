import { LucideIconName } from "@/components/categories/category-card";

export interface ICategory {
  _id: string;
  description: string;
  slug: string;
  name: string;
  icon: LucideIconName;
}
