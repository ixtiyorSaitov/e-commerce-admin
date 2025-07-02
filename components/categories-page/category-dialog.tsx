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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SimpleIconInput } from "./set-icon";
import axios from "axios";
import { LoadingSpinner } from "../ui/loading-spinner";
import { ICategory } from "@/interfaces/category.interface";
// import { FullIconPicker } from "./full-icon-picker" // Agar to'liq versiya kerak bo'lsa

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ICategory | null;
  onSave: (category: ICategory) => void;
  submitBtnVariant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
}

export function OptimizedCategoryDialog({
  open,
  onOpenChange,
  category,
  onSave,
  submitBtnVariant = "default",
}: CategoryDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active" as "active" | "inactive",
    icon: "Home",
  });
  const [iconExists, setIconExists] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        status: category.status || "active",
        icon: category.icon || "Home",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "active",
        icon: "Home",
      });
    }
  }, [category]);

  const handleSubmit = async () => {
    console.log(formData);
    try {
      setLoading(true);
      const isEditing = !!category;
      const endpoint = isEditing
        ? `/api/category/edit-category/${category._id}`
        : "/api/category/create-category";
      const method = isEditing ? "put" : "post";

      const { data: response } = await axios[method](endpoint, formData);
      if (response.success) {
        onSave(response.data);
        setFormData({
          name: "",
          description: "",
          status: "active",
          icon: "Home",
        });
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Update category information"
              : "Create a new product category"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              disabled={loading}
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="bg-white dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              disabled={loading}
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="bg-white dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Simple icon input - yengil versiya */}
          <SimpleIconInput
            existIcon={iconExists}
            setExistIcon={setIconExists}
            disabled={loading}
            value={formData.icon}
            onChange={(iconName) =>
              setFormData({ ...formData, icon: iconName })
            }
            label="Icon"
          />

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className="w-full bg-white dark:bg-gray-800 dark:text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 dark:text-gray-100">
                <SelectItem
                  value="active"
                  className="bg-white dark:bg-gray-800 dark:text-gray-100"
                >
                  Active
                </SelectItem>
                <SelectItem
                  value="inactive"
                  className="bg-white dark:bg-gray-800 dark:text-gray-100"
                >
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
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
              variant={submitBtnVariant}
              className="bg-gradient-to-r from-primary to-primary/90"
              onClick={handleSubmit}
              disabled={loading || !iconExists}
            >
              {category ? "Update Category" : "Create Category"}
              {loading && <LoadingSpinner size="sm" />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
