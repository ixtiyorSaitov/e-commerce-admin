import Admin from "@/database/admin.model";
import Category from "@/database/category.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ status: "unauthenticated" }, { status: 401 });
    }

    const admin = await Admin.findOne({ email: session.user.email });
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    const { name, icon, description, status } = await req.json();
    if (!name || !icon || !description || !status) {
      // required fields tekshiruv
      return NextResponse.json(
        { error: "Majburiy maydonlar to‘ldirilmagan" },
        { status: 400 }
      );
    }
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    if (name !== category.name) {
      const slug = slugify(name, { lower: true, strict: true });
      category.slug = slug;
    }
    // Update fields
    category.name = name.trim();
    category.description = description.trim();
    category.status = status;
    category.icon = icon;

    await category.save();

    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
