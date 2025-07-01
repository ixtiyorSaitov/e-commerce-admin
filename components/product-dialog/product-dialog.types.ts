import { ICategory } from "@/interfaces/category.interface";
import { IProduct } from "@/interfaces/product.interface";

export type StrOrNull = string | null;

export interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: IProduct) => void;
  categories: ICategory[] | null;
  product: IProduct | null;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number | null;
  oldPrice: number | null;
  categories: string[];
  benefits: string[];
  isOriginal: boolean;
}

export interface ProductDialogErrors {
  nameError: StrOrNull;
  categoryError: StrOrNull;
  descriptionError: StrOrNull;
  priceErrors: StrOrNull;
  imageError: StrOrNull;
  benefitsError: StrOrNull;
}
