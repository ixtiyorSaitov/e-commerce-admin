"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ImageUploader from "@/components/ui/image-uploader";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { ProductDialogProps } from "./product-dialog.types";
import { useProductDialog } from "./product-dialog.hooks";

export function ProductDialog({
  open,
  onOpenChange,
  onSave,
  categories,
  product,
}: ProductDialogProps) {
  const {
    loading,
    formData,
    errors,
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
  } = useProductDialog({ product, onOpenChange, onSave, categories });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Update your product information"
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
              onChange={(e) => handleChange("name", e.target.value)}
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
                if (value) {
                  const ctg = categories?.find((c) => c.slug === value);
                  if (ctg) {
                    setFormData({
                      ...formData,
                      categories: [...formData.categories, ctg?._id],
                    });
                  }
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
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.categories.map((category) => {
                const ctg = categories?.find((f) => f._id === category);
                return (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {ctg?.name}
                    <button
                      disabled={loading}
                      type="button"
                      onClick={() => removeItem("categories", category)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
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
              onChange={(e) => handleChange("description", e.target.value)}
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
                value={formData.price || ""}
                disabled={loading}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="oldPrice">Old Price ($)</Label>
              <Input
                id="oldPrice"
                type="number"
                step="0.01"
                value={formData.oldPrice || ""}
                disabled={loading}
                onChange={(e) =>
                  handleChange("oldPrice", Number(e.target.value))
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
              initialImages={initialImages}
              setInitialImages={setInitialImages}
              newImages={newImages}
              setNewImages={setNewImages}
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
                onKeyDown={(e) =>
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
                    onClick={() => removeItem("benefits", index)}
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
              onCheckedChange={(checked) => handleChange("isOriginal", checked)}
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
