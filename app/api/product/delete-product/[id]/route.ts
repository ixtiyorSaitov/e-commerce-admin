import Product from "@/database/product.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const id = params.id;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Product successfully deleted." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
