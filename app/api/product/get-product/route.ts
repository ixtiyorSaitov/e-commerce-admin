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
    const populate = searchParams.get("populate") === "true"; // 'true' bo'lsa boolean true

    if (categorySlug && !productSlug) {
      const category = await Category.findOne({ name: categorySlug });
      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      const query = Product.find({ categories: category._id });
      if (populate) query.populate("categories");

      const filteredProducts = await query;

      return NextResponse.json({
        success: true,
        category: category.name,
        datas: filteredProducts,
      });
    }

    if (productSlug) {
      const query = Product.findOne({ slug: productSlug });
      if (populate) query.populate("categories");

      const product = await query;
      if (!product) {
        return NextResponse.json({ error: "Product not found" });
      }

      return NextResponse.json(
        { success: true, data: product },
        { status: 200 }
      );
    }

    // populate ? await Product.find().populate(...) : await Product.find();
    const query = Product.find();
    if (populate) query.populate("categories");

    const products = await query;
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
