"use client";

import type React from "react";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { Switch } from "@/components/ui/switch";

import { X, Plus } from "lucide-react";

import type { Product } from "@/types";

import ImageUploader from "./ui/image-uploader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nameValidation } from "@/lib/validation";

interface ProductDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  product?: Product | null;

  onSave: (product: Product | Omit<Product, "id">) => void;
}

const categories = [
  "Electronics",

  "Fashion",

  "Home & Garden",

  "Sports",

  "Books",

  "Toys",
];
type StrOrNull = string | null;

export function ProductDialog({
  open,

  onOpenChange,

  product,

  onSave,
}: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",

    description: "",

    price: "",

    oldPrice: "",

    categories: [] as string[],

    image: "",

    benefits: [] as string[],

    isOriginal: false,
  });
  const [errors, setErrors] = useState<{
    nameError: StrOrNull;
    categoryError: StrOrNull;
    descriptionError: StrOrNull;
    priceErrors: StrOrNull;
    imageError: StrOrNull;
    benefitsError: StrOrNull;
  }>({
    nameError: null,
    categoryError: null,
    descriptionError: null,
    priceErrors: null,
    imageError: null,
    benefitsError: null,
  });

  const [newBenefit, setNewBenefit] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,

        description: product.description,

        price: product.price.toString(),

        oldPrice: product.oldPrice?.toString() || "",

        categories: product.categories || [],

        image: product.image,

        benefits: product.benefits || [],

        isOriginal: product.isOriginal || false,
      });
    } else {
      setFormData({
        name: "",

        description: "",

        price: "",

        oldPrice: "",

        categories: [],

        image: "",

        benefits: [],

        isOriginal: false,
      });
    }
  }, [product]);

  const handleSubmit = () => {
    if (!nameValidation(formData.name)) {
      return setErrors({
        ...errors,
        nameError: "Mahsulot nomi kamida 4 ta belgidan iborat bo'lishi kerak",
      });
    }
    if (categories.length === 0) {
      return setErrors({
        ...errors,
        categoryError: "Kamida 1 ta kategoriya bo'lishi kerak",
      });
    }
    if (formData.description.length < 10 || formData.description.length > 200) {
      const len = formData.description.length;
      return setErrors({
        ...errors,
        descriptionError:
          len < 10
            ? "Description kamida 10 ta harfdan iborat bo'lishi kerak"
            : "Description maksimal 200 ta harfdan iborat bo'lishi kerak",
      });
    }
    if (
      !(formData.price || formData.oldPrice) ||
      (formData.price || formData.oldPrice) === "0"
    ) {
      setErrors({
        ...errors,
        priceErrors: "Narxlar bo'lishi shart",
      });
    } 
    if(formData.benefits.length < 2) {
      setErrors({...errors, benefitsError: "Benefit kamida 2 ta bo'lishi shart!"})
    }
    const productData = {
      name: formData.name,

      description: formData.description,

      price: Number.parseFloat(formData.price),

      oldPrice: formData.oldPrice
        ? Number.parseFloat(formData.oldPrice)
        : undefined,

      categories: formData.categories,

      image: formData.image || "/placeholder.svg?height=60&width=60",

      benefits: formData.benefits,

      isOriginal: formData.isOriginal,
    };
    console.log(productData);
  };

  const addBenefit = () => {
    if (newBenefit.trim() && formData.benefits.length < 4) {
      setFormData({
        ...formData,

        benefits: [...formData.benefits, newBenefit.trim()],
      });

      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,

      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const removeCategory = (category: string) => {
    setFormData({
      ...formData,

      categories: formData.categories.filter((c) => c !== category),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>

          <DialogDescription>
            {product
              ? "Update product information"
              : "Create a new product listing"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>

            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <Select
              value=""
              onValueChange={(value) => {
                if (value && !formData.categories.includes(value)) {
                  setFormData({
                    ...formData,
                    categories: [...formData.categories, value],
                  });
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select categories" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((category) => !formData.categories.includes(category))
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {formData.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>

              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="oldPrice">Old Price ($)</Label>

              <Input
                id="oldPrice"
                type="number"
                step="0.01"
                value={formData.oldPrice}
                onChange={(e) =>
                  setFormData({ ...formData, oldPrice: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>

            <ImageUploader />
          </div>

          <div className="space-y-2">
            <Label>Product Benefits (Max 4)</Label>

            <div className="flex space-x-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add a product benefit"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addBenefit())
                }
              />

              <Button
                type="button"
                onClick={addBenefit}
                disabled={formData.benefits.length >= 4 || !newBenefit.trim()}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.benefits.map((benefit, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {benefit}

                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isOriginal"
              checked={formData.isOriginal}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isOriginal: checked })
              }
            />

            <Label htmlFor="isOriginal">Original Product</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary/90"
              onClick={handleSubmit}
            >
              {product ? "Update Product" : "Create Product"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
