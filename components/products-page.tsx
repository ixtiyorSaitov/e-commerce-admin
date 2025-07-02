"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";
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
import { ProductDialog } from "@/components/product-dialog";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { ICategory } from "@/interfaces/category.interface";
import { IProduct } from "@/interfaces/product.interface";
import Image from "next/image";
import ReactStars from "react-stars";
import { AlertModal } from "./ui/alert-modal";
import { deleteImage } from "@/supabase/storage/deleteImage";
import ProductTableRowSkeleton from "./products-page/table-skeleton";
import { useRouter } from "next/navigation";

export function ProductsPage() {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<IProduct | null>(null);
  const [deleteProductLoading, setDeleteProductLoading] =
    useState<boolean>(false);
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data: response } = await axios.get("/api/category/get-all");
        console.log("category", response);
        if (response.success) {
          setCategories(response.datas);
        }
      } catch (error) {
        console.error("Kategoriyani olishda xatolik", error);
      }
    };
    const fetchProducts = async () => {
      try {
        const { data: response } = await axios.get("/api/product/get-product");
        console.log("product", response);
        if (response.success) {
          setProducts(response.datas);
        }
      } catch (error) {
        console.error("Kategoriyani olishda xatolik", error);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
    fetchCategory();
  }, []);

  const filteredProducts = products?.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = product.categories.some((c) =>
      c.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return nameMatch || categoryMatch;
  });

  const handleAddProduct = (product: IProduct) => {
    if (products !== null) {
      setProducts([...products, product]);
    }
    setDialogOpen(false);
  };

  const handleEditProduct = (product: IProduct) => {
    console.log(product);
    
    // setProducts(products.map((p) => (p.id === product.id ? product : p)));
    setEditingProduct(null);
    setDialogOpen(false);
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;
    setDeleteProductLoading(true);

    try {
      // Avval rasmlarni o'chiramiz
      const images = deletingProduct.images;
      for (const url of images) {
        await deleteImage({ url, bucket: "dank-pics" });
      }

      // Keyin productni o'chiramiz
      const { data: response } = await axios.delete(
        `/api/product/delete-product/${deletingProduct._id}`
      );

      if (response.success) {
        setProducts(
          products?.filter((p) => p._id !== deletingProduct._id) || null
        );
        setDeleteAlert(false);
        setDeletingProduct(null);
      }
    } catch (error) {
      console.error("Mahsulotni o‘chirishda xatolik:", error);
    } finally {
      setDeleteProductLoading(false);
    }
  };

  const openEditDialog = (product: IProduct) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (dialogOpen === false) {
      setEditingProduct(null);
    }
  }, [dialogOpen]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button
          onClick={openAddDialog}
          className="bg-gradient-to-r from-primary to-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product List</CardTitle>
              <CardDescription>
                {products?.length} products found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
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
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsLoading ? (
                <>
                  <ProductTableRowSkeleton />
                  <ProductTableRowSkeleton />
                  <ProductTableRowSkeleton />
                  <ProductTableRowSkeleton />
                </>
              ) : (
                filteredProducts?.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground max-w-[300px] line-clamp-1">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {/* {product.categories.length>} */}
                      <div className="flex items-centere justify-center flex-col gap-1">
                        {product.categories.map((c, i) => {
                          if (i > 2) {
                            return;
                          }
                          const ctg = categories?.find((f) => f._id === c);
                          return (
                            <Badge
                              className="flex items-center justify-center line-clamp-1 max-w-[200px]"
                              key={c}
                              variant="secondary"
                            >
                              {ctg?.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {product.price.toLocaleString("ru-RU")} {"so'm"}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.oldPrice.toLocaleString("ru-RU")} {"so'm"}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <ReactStars size={20} edit={false} count={5} value={5} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.isOriginal ? "success" : "info"}>
                        {product.isOriginal ? "Original" : "Copy"}
                      </Badge>
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
                            onClick={() =>
                              router.push(`/products/${product.slug}`)
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setDeleteAlert(true);
                              setDeletingProduct(product);
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ProductDialog
        categories={categories}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editingProduct}
        onSave={editingProduct ? handleEditProduct : handleAddProduct}
      />
      <AlertModal
        open={deleteAlert}
        setOpen={setDeleteAlert}
        title="Delete product"
        description={`Do you want delete this product: ${deletingProduct?.name}`}
        loading={deleteProductLoading}
        onSubmit={handleDeleteProduct}
      />
    </div>
  );
}
