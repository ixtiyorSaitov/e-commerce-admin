"use client";

import type React from "react";

import { useState, useEffect, Dispatch, SetStateAction } from "react";

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
import { uploadImage } from "@/supabase/storage/client";
import { convertBlobUrlToFile } from "@/lib/utils";
import { LoadingSpinner } from "./ui/loading-spinner";
import { ICategory } from "@/interfaces/category.interface";
import axios from "axios";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (product: Product | Omit<Product, "id">) => void;
  categories: ICategory[];
}

type StrOrNull = string | null;

export function ProductDialog({
  open,

  onOpenChange,

  product,

  onSave,
  categories,
}: ProductDialogProps) {
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<StrOrNull>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",

    description: "",

    price: "",

    oldPrice: "",

    categories: [] as string[],

    image: [],

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
    imageError: imageError,
    benefitsError: null,
  });

  const [newBenefit, setNewBenefit] = useState("");
  const resetErrors = () => {
    setErrors({
      nameError: null,
      categoryError: null,
      descriptionError: null,
      priceErrors: null,
      imageError: null,
      benefitsError: null,
    });
  };

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

        image: [],

        benefits: [],

        isOriginal: false,
      });
    }
  }, [product]);

  const handleSubmit = async () => {
    if (!nameValidation(formData.name)) {
      return setErrors({
        ...errors,
        nameError: "Mahsulot nomi kamida 4 ta belgidan iborat bo'lishi kerak",
      });
    } else {
      setErrors({ ...errors, nameError: null });
    }
    if (formData.categories.length === 0) {
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
      return setErrors({
        ...errors,
        priceErrors: "Narxlar bo'lishi shart",
      });
    }
    if (imageUrls.length === 0) {
      return setErrors({
        ...errors,
        imageError: "Kamida 1 ta rasm yuklanishi kerak",
      });
    }
    if (formData.benefits.length < 2) {
      return setErrors({
        ...errors,
        benefitsError: "Benefit kamida 2 ta bo'lishi shart!",
      });
    }
    resetErrors();
    try {
      setLoading(true);
      const uploadedUrls = [];

      for (const url of imageUrls) {
        const file = await convertBlobUrlToFile(url);
        const { imageUrl, error } = await uploadImage({
          file,
          bucket: "dank-pics",
        });

        if (error) {
          setImageError("Rasm yuklashda xatolik yuz berdi");
          return;
        }

        uploadedUrls.push(imageUrl);
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        oldPrice: Number(formData.oldPrice),
        categories: formData.categories,
        images: uploadedUrls,
        benefits: formData.benefits,
        isOriginal: formData.isOriginal,
      };
      const { data: response } = await axios.post(
        "/api/product/create-product",
        productData
      );
      console.log(response);

      if (response.success) {
        console.log("SUCCESS!");
      }

      // onSave(productData);
      // onOpenChange(false);
      setFormData({
        name: "",

        description: "",

        price: "",

        oldPrice: "",

        categories: [],

        image: [],

        benefits: [],

        isOriginal: false,
      });

      setImageUrls([]);
    } catch (err) {
      setImageError("Noma'lum xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
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
              disabled={loading}
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            {errors.nameError && (
              <p className="text-[13px] text-destructive">{errors.nameError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <Select
              disabled={loading}
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
                {categories?.map((category) => (
                  <SelectItem key={category._id} value={category.slug}>
                    {category.name}
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
                      disabled={loading}
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
            {errors.categoryError && (
              <p className="text-[13px] text-destructive">
                {errors.categoryError}
              </p>
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
              disabled={loading}
              rows={3}
            />
            {errors.descriptionError && (
              <p className="text-[13px] text-destructive">
                {errors.descriptionError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>

              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                disabled={loading}
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
                disabled={loading}
                onChange={(e) =>
                  setFormData({ ...formData, oldPrice: e.target.value })
                }
              />
            </div>
          </div>
          {errors.priceErrors && (
            <p className="text-[13px] text-destructive">{errors.priceErrors}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <ImageUploader
              loading={loading}
              error={imageError}
              setImageError={setImageError}
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
            />

            {errors.imageError && (
              <p className="text-[13px] text-destructive">
                {errors.imageError}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Product Benefits (Min 2)</Label>

            <div className="flex space-x-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add a product benefit"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addBenefit())
                }
                disabled={loading}
              />

              <Button
                type="button"
                onClick={addBenefit}
                disabled={!newBenefit.trim() || loading}
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
                  <p className="max-w-[200px] line-clamp-1">{benefit}</p>

                  <button
                    disabled={loading}
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.benefitsError && (
              <p className="text-[13px] text-destructive">
                {errors.benefitsError}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isOriginal"
              checked={formData.isOriginal}
              disabled={loading}
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
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary/90"
              onClick={handleSubmit}
              disabled={loading}
            >
              {product ? "Update Product" : "Create Product"}
              {loading && <LoadingSpinner size="sm" />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
