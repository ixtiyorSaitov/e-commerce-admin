import Category from "@/database/category.model";
import Product from "@/database/product.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const productSlug = searchParams.get("slug");

    if (categorySlug && !productSlug) {
      const category = await Category.findOne({ name: categorySlug });
      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      // Optimallashtirilgan filter
      const filteredProducts = await Product.find({
        categories: category._id,
      });

      return NextResponse.json({
        success: true,
        category: category.name,
        datas: filteredProducts,
      });
    }
    if (productSlug) {
      const product = await Product.findOne({ slug: productSlug });
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, data: product },
        { status: 200 }
      );
    }

    // Kategoriya berilmagan bo‘lsa, barcha productlar
    const products = await Product.find();
    return NextResponse.json(
      { success: true, datas: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
