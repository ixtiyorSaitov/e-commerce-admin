import Category from "@/database/category.model";
import Product from "@/database/product.model";
import { connectToDatabase } from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

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
    if (categories.length === 0) {
      return NextResponse.json(
        { error: "At least one category is required" },
        { status: 400 }
      );
    }

    // Productni topamiz
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Eski category idlarini saqlab qolamiz
    const oldCategoryIds = existingProduct.categories.map((catId: string) =>
      catId.toString()
    );

    // Yangi category object IDlar
    const categoryObjectIds = categories.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    const newCategoryIds = categoryObjectIds.map((id) => id.toString());

    // Farqlarni aniqlaymiz
    const addedCategories = newCategoryIds.filter(
      (id) => !oldCategoryIds.includes(id)
    );
    const removedCategories = oldCategoryIds.filter(
      (id: string) => !newCategoryIds.includes(id)
    );

    // Mahsulot maydonlarini yangilaymiz
    existingProduct.name = name.trim();
    existingProduct.description = description.trim();
    existingProduct.price = price;
    existingProduct.oldPrice = oldPrice;
    existingProduct.categories = categoryObjectIds;
    existingProduct.images = images;
    existingProduct.benefits = benefits;
    existingProduct.isOriginal = isOriginal;

    // Slug yangilash (agar name o‘zgargan bo‘lsa)
    if (name !== existingProduct.name) {
      const slug = slugify(name, { lower: true, strict: true });
      existingProduct.slug = slug;
    }

    // Kategoriya: yangi qo‘shilganlarga product._id ni qo‘shamiz
    await Promise.all(
      addedCategories.map((catId) =>
        Category.updateOne(
          { _id: catId },
          { $addToSet: { products: existingProduct._id } }
        )
      )
    );

    // Kategoriya: olib tashlanganlardan product._id ni o‘chiramiz
    await Promise.all(
      removedCategories.map((catId: string) =>
        Category.updateOne(
          { _id: catId },
          { $pull: { products: existingProduct._id } }
        )
      )
    );

    // Agar category o‘chirilgan bo‘lsa, product ichidagi category listdan ham tozalaymiz
    for (const removedId of removedCategories) {
      const exists = await Category.exists({ _id: removedId });
      if (!exists) {
        existingProduct.categories = existingProduct.categories.filter(
          (catId: string) => catId.toString() !== removedId
        );
      }
    }

    // Mahsulotni saqlaymiz
    await existingProduct.save();

    return NextResponse.json(
      { success: true, data: existingProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
