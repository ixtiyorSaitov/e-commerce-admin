"use client";

import { AdminLayout } from "@/components/admin-layout";
import { CategoriesPage } from "@/components/categories-page/index";
import CategoriesSkeleton from "@/components/categories-page/skeleton-loading";
import { ICategory } from "@/interfaces/category.interface";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data: response } = await axios.get("/api/category/get-all");
        console.log("categories", response);

        if (response.success) {
          setCategories(response.datas);
        }
      } catch (error) {
        console.error("Error get with categories");
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);
  return (
    <AdminLayout>
      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <>{categories !== null && <CategoriesPage datas={categories} />}</>
      )}
    </AdminLayout>
  );
}
