import { useState, useEffect, useCallback } from "react";
import { convertBlobUrlToFile } from "@/lib/utils";
import { uploadImage, deleteImage } from "@/supabase/storage/client";
import axios from "axios";
import type {
  ProductDialogProps,
  ProductFormData,
  ProductDialogErrors,
} from "./product-dialog.types";

const initialFormState: ProductFormData = {
  name: "",
  description: "",
  price: null,
  oldPrice: null,
  categories: [],
  benefits: [],
  isOriginal: true,
};

const initialErrorState: ProductDialogErrors = {
  nameError: null,
  categoryError: null,
  descriptionError: null,
  priceErrors: null,
  imageError: null,
  benefitsError: null,
};

type StrOrNull = string | null;

export function useProductDialog({
  product,
  onOpenChange,
  onSave,
}: Pick<
  ProductDialogProps,
  "product" | "onOpenChange" | "onSave" | "categories"
>) {
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState<StrOrNull>(null);
  const [initialImages, setInitialImages] = useState<string[]>(
    product?.images || []
  );
  const [newImages, setNewImages] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");
  const [formData, setFormData] = useState<ProductFormData>(initialFormState);
  const [errors, setErrors] = useState<ProductDialogErrors>(initialErrorState);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        oldPrice: product.oldPrice || null,
        categories: product.categories,
        benefits: product.benefits,
        isOriginal: product.isOriginal || false,
      });
      setInitialImages(product.images || []);
    } else {
      setFormData(initialFormState);
      setInitialImages([]);
    }
    setErrors(initialErrorState);
  }, [product]);

  const validateForm = useCallback(() => {
    const newErrors = { ...initialErrorState };
    let isValid = true;

    if (!formData.name || formData.name.length < 4) {
      newErrors.nameError = "Product name must be at least 4 characters";
      isValid = false;
    }

    if (formData.categories.length === 0) {
      newErrors.categoryError = "At least 1 category is required";
      isValid = false;
    }

    if (formData.description.length < 10 || formData.description.length > 200) {
      newErrors.descriptionError =
        formData.description.length < 10
          ? "Description must be at least 10 characters"
          : "Description cannot exceed 200 characters";
      isValid = false;
    }

    if (!formData.price && !formData.oldPrice) {
      newErrors.priceErrors = "Price is required";
      isValid = false;
    }

    if (initialImages.length + newImages.length === 0) {
      newErrors.imageError = "At least 1 image is required";
      isValid = false;
    }

    if (formData.benefits.length < 2) {
      newErrors.benefitsError = "At least 2 benefits are required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, initialImages, newImages]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Upload new images
      const uploadedUrls: string[] = [];
      for (const url of newImages) {
        const file = await convertBlobUrlToFile(url);
        const { imageUrl, error } = await uploadImage({
          file,
          bucket: "dank-pics",
        });
        if (error) throw new Error("Upload failed");
        uploadedUrls.push(imageUrl);
      }

      // Delete removed images
      const deleted =
        product?.images?.filter(
          (oldUrl: string) => !initialImages.includes(oldUrl)
        ) || [];
      for (const url of deleted) {
        await deleteImage({ url, bucket: "dank-pics" });
      }
      // const ctgWithId = categories
      //   ?.filter((ctg) => formData.categories.includes(ctg.slug))
      //   .map((ctg) => ctg._id);

      const productData = {
        ...formData,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
        images: [...initialImages, ...uploadedUrls],
        // categories: ctgWithId,
      };

      const isEditing = !!product;
      const endpoint = isEditing
        ? `/api/product/edit-product/${product._id}`
        : "/api/product/create-product";
      const method = isEditing ? "put" : "post";

      const { data: response } = await axios[method](endpoint, productData);
      console.log(response);

      if (response.success) {
        onSave(response.data);
        onOpenChange(false);
        setFormData(initialFormState);
        setInitialImages([]);
        setNewImages([]);
      }
    } catch (err) {
      console.error(err);
      setImageError("Error uploading or deleting images");
    } finally {
      setLoading(false);
    }
  }, [
    formData,
    initialImages,
    newImages,
    product,
    validateForm,
    onSave,
    onOpenChange,
  ]);

  const addBenefit = useCallback(() => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit("");
    }
  }, [newBenefit]);

  const removeItem = useCallback(
    (key: "benefits" | "categories", indexOrValue: number | string) => {
      setFormData((prev) => ({
        ...prev,
        [key]: Array.isArray(prev[key])
          ? typeof indexOrValue === "number"
            ? prev[key].filter((_, i) => i !== indexOrValue)
            : prev[key].filter((val) => val !== indexOrValue)
          : prev[key],
      }));
    },
    []
  );

  const handleChange = useCallback(
    <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  return {
    loading,
    formData,
    errors,
    imageUrls: [...initialImages, ...newImages],
    newBenefit,
    handleSubmit,
    handleChange,
    addBenefit,
    removeItem,
    setNewBenefit,
    imageError,
    setImageError,
    initialImages,
    setInitialImages,
    newImages,
    setNewImages,
    setFormData,
  };
}
