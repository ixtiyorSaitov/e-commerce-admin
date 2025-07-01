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
// import { FullIconPicker } from "./full-icon-picker" // Agar to'liq versiya kerak bo'lsa

interface ICategory {
  name: string;
  description: string;
  status: "active" | "inactive";
  icon: string;
  productCount: number;
}

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ICategory | null;
  onSave: (category: ICategory) => void;
}

export function OptimizedCategoryDialog({
  open,
  onOpenChange,
  category,
  onSave,
}: CategoryDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active" as "active" | "inactive",
    icon: "Home",
    productCount: 0,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        status: category.status || "active",
        productCount: category.productCount,
        icon: category.icon || "Home",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "active",
        productCount: 0,
        icon: "Home",
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as ICategory);
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
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
            value={formData.icon}
            onChange={(iconName) =>
              setFormData({ ...formData, icon: iconName })
            }
            label="Icon"
          />

          {/* Yoki to'liq versiya uchun:
          <FullIconPicker
            value={formData.icon}
            onChange={(iconName) => setFormData({ ...formData, icon: iconName })}
            label="Icon"
          />
          */}

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
              type="submit"
              className="bg-gradient-to-r from-primary to-primary/90"
            >
              {category ? "Update Category" : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
