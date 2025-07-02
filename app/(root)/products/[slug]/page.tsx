"use client";

import { AdminLayout } from "@/components/admin-layout";
import ProductPageComponent from "@/components/product-page";
import ProductPageSkeleton from "@/components/product-page/skeleton";
import { IProduct } from "@/interfaces/product.interface";
import axios from "axios";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductNotFound from "./not-found";

const ProductPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data: response } = await axios.get(
          `/api/product/get-product?slug=${slug}&populate=true`
        );
        console.log(response);
        if (response.success) {
          setProduct(response.data);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error with get product", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [slug]);
  return (
    <AdminLayout>
      {loading ? (
        <ProductPageSkeleton />
      ) : (
        <>
          {product !== null ? (
            <ProductPageComponent product={product} />
          ) : (
            <ProductNotFound />
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default ProductPage;
