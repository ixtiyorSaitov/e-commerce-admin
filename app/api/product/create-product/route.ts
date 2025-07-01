import Admin from "@/database/admin.model";
import Product from "@/database/product.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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

    const slug = slugify(name, { lower: true, strict: true });

    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      slug,
      price,
      oldPrice,
      categories,
      images,
      benefits,
      isOriginal: isOriginal || false,
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error("❌ Error:", error);
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 500 });
  }
}
