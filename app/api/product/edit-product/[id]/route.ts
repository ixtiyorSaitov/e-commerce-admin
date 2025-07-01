import Product from "@/database/product.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

interface ProductData {
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  categories: string[];
  images: string[];
  benefits: string[];
  isOriginal: boolean;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const id = params.id;
    const {
      name,
      description,
      price,
      oldPrice,
      categories,
      images,
      benefits,
      isOriginal,
    }: ProductData = await req.json();

    // Validation
    if (
      !name?.trim() ||
      !description?.trim() ||
      typeof price !== "number" ||
      typeof oldPrice !== "number" ||
      !Array.isArray(categories) ||
      !Array.isArray(images) ||
      !Array.isArray(benefits)
    ) {
      return NextResponse.json(
        { error: "Please enter all required fields" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update fields
    product.name = name.trim();
    product.description = description.trim();
    product.price = price;
    product.oldPrice = oldPrice;
    product.categories = categories;
    product.images = images;
    product.benefits = benefits;
    product.isOriginal = isOriginal;

    await product.save();

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
