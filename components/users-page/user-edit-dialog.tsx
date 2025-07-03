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
import axios from "axios";
import { LoadingSpinner } from "../ui/loading-spinner";
import { ICategory } from "@/interfaces/category.interface";
import { IUser } from "@/interfaces/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { emailValidation, nameValidation } from "@/lib/validation";
import { toast } from "sonner";
// import { FullIconPicker } from "./full-icon-picker" // Agar to'liq versiya kerak bo'lsa

interface UserEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser;
  onSave: (user: IUser) => void;
  submitBtnVariant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
}

export function UserEditDialog({
  open,
  onOpenChange,
  user,
  onSave,
  submitBtnVariant = "default",
}: UserEditDialogProps) {
  const [formData, setFormData] = useState(user);
  useEffect(() => {
    setFormData(user);
  }, [user]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    nameError: string | null;
    emailError: string | null;
  }>({ nameError: null, emailError: null });

  const handleSubmit = async () => {
    console.log(formData);
    if (formData.name.trim() === "") {
      return setErrors({ ...errors, nameError: "Name is require field" });
    } else if (!nameValidation(formData.name.trim())) {
      return setErrors({
        ...errors,
        nameError: "Name must be minimal 5 characters",
      });
    }
    if (formData.email.trim() === "") {
      return setErrors({ ...errors, nameError: "Email is require field" });
    } else if (!emailValidation(formData.email.trim())) {
      return setErrors({ ...errors, nameError: "Invalid email" });
    }
    setErrors({ nameError: "", emailError: "" });
    try {
      setLoading(true);
      const { data: response } = await axios.put(
        `/api/user/edit-user/${user._id}`,
        {
          name: formData.name,
          email: formData.email,
          status: formData.status || "inactive",
        }
      );
      console.log(response);
      if (response.success) {
        toast.success("Success", { description: "User edited successfuly!" });
        onSave(formData);
      } else {
        toast.success("Error", { description: response.error });
      }
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2 flex items-center justify-center">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.profileImage} alt="@shadcn" />
              <AvatarFallback className="text-3xl">
                {user.name.split(" ").map((c) => c[0])}
              </AvatarFallback>
            </Avatar>
          </div>
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
            {errors.nameError && (
              <p className="text-destructive text-[13px]">{errors.nameError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Email</Label>
            <Input
              disabled={loading}
              id="name"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="bg-white dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.nameError && (
              <p className="text-destructive text-[13px]">{errors.nameError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              disabled={loading}
              value={formData.status || "inactive"}
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
              disabled={
                loading ||
                formData.name === "" ||
                formData.email === "" ||
                (formData.name === user.name &&
                  formData.email === user.email &&
                  user.status === formData.status)
              }
            >
              Update User
              {loading && <LoadingSpinner size="sm" />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
