"use client";

import { AdminLayout } from "@/components/admin-layout";
import { ProductsPage } from "@/components/products-page";

const ProductPage = () => {
  return (
    <AdminLayout>
      <ProductsPage />
    </AdminLayout>
  );
};

export default ProductPage;
