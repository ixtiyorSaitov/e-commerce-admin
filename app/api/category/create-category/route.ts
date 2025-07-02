import Admin from "@/database/admin.model";
import Category from "@/database/category.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
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
    const { name, icon, description, status } = await req.json();

    if (!name || !icon || !description || !status) {
      // required fields tekshiruv
      return NextResponse.json(
        { error: "Majburiy maydonlar to‘ldirilmagan" },
        { status: 400 }
      );
    }
    const slug = slugify(name, { lower: true, strict: true });

    // Save base
    const category = await Category.create({
      name,
      slug,
      icon,
      description,
      status,
      products: [],
    });
    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
