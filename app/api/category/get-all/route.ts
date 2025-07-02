import Category from "@/database/category.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    // Bazadan barcha kategoriyalarni olib kelamiz
    const categories = await Category.find().lean();

    // Har bir category uchun products o‘rniga productCount ni ajratamiz
    const formattedCategories = categories.map((category) => {
      const { products, ...rest } = category;
      return {
        ...rest,
        productCount: products?.length || 0,
      };
    });

    return NextResponse.json(
      { success: true, datas: formattedCategories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
