"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  FolderTree,
} from "lucide-react";
import { ICategory } from "@/interfaces/category.interface";
import { OptimizedCategoryDialog } from "./category-dialog";
import { AlertModal } from "../ui/alert-modal";
import { toast } from "sonner";
import axios from "axios";

export function CategoriesPage({ datas }: { datas: ICategory[] }) {
  const [categories, setCategories] = useState<ICategory[]>(datas);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(
    null
  );
  const [deleteCategoryLoading, setDeleteCategoryLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (newCategory: ICategory) => {
    setCategories([...categories, newCategory]);
    setDialogOpen(false);
  };

  const handleEditCategory = (category: ICategory) => {
    setCategories(
      categories.map((c) => {
        if (c._id === category._id) {
          return category;
        }
        return c;
      })
    );
    setEditingCategory(null);
    setDialogOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c._id !== id));
  };

  const openEditDialog = (category: ICategory) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingCategory(null);
    setDialogOpen(true);
  };

  const handleDeleteProduct = async () => {
    try {
      setDeleteCategoryLoading(true);
      const { data: response } = await axios.delete(
        `/api/category/delete-category/${deletingCategory?._id}`
      );
      console.log(response);
      if (response.success) {
        toast.success("Error", {
          description: "Category deleted successfully",
        });
        setCategories(
          categories.filter((c) => c._id !== deletingCategory?._id)
        );
        setDeletingCategory(null);
        setDeleteAlert(false);
      }
    } catch (error) {
      toast.error("Error", {
        description: "Error deleting with category",
      });
    } finally {
      setDeleteCategoryLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Organize your products into categories
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          className="bg-gradient-to-r from-primary to-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          {
            title: "Total Categories",
            value: categories.length,
            color: "text-blue-600",
          },
          {
            title: "Active Categories",
            value: categories.filter((c) => c.status === "active").length || 4,
            color: "text-green-600",
          },
          {
            title: "Total Products",
            value: categories.reduce((sum, c) => sum + c.productCount, 0),
            color: "text-purple-600",
          },
          {
            title: "Avg Products/Category",
            value: Math.round(
              categories.reduce((sum, c) => sum + c.productCount, 0) /
                categories.length
            ),
            color: "text-orange-600",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg bg-card/50 backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title} asdasd
              </CardTitle>
              <FolderTree className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Category List</CardTitle>
              <CardDescription>
                {filteredCategories.length} categories found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                        <FolderTree className="h-5 w-5 text-primary" />
                      </div>
                      <div className="font-medium">{category.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {category.productCount} products
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        category.status === "active" ? "default" : "secondary"
                      }
                    >
                      {/* {category.status} */}
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openEditDialog(category)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setDeleteAlert(true);
                            setDeletingCategory(category);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <OptimizedCategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editingCategory}
        onSave={editingCategory ? handleEditCategory : handleAddCategory}
        submitBtnVariant={"destructive"}
      />
      <AlertModal
        open={deleteAlert}
        setOpen={setDeleteAlert}
        title="Delete category"
        description={`Do you want delete this category: ${deletingCategory?.name}`}
        submitBtnText="Delete"
        loading={deleteCategoryLoading}
        onSubmit={handleDeleteProduct}
      />
    </div>
  );
}
