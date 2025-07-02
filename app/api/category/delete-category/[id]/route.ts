import Admin from "@/database/admin.model";
import Category from "@/database/category.model";
import Product from "@/database/product.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ status: "unauthenticated" }, { status: 401 });
    }

    const admin = await Admin.findOne({ email: session.user.email });
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    const { id } = context.params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // 🔥 Productlardan categoryId ni olib tashlash
    await Product.updateMany({ categories: id }, { $pull: { categories: id } });

    // 🔥 Endi categoryni o'chirish
    await Category.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Category and related references removed." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
