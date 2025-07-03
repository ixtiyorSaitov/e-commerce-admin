import Admin from "@/database/admin.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ status: "unauthenticated" }, { status: 401 });
    }

    const admin = await Admin.findOne({ email: session.user.email });
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    await connectToDatabase();
    const { id } = await params;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    const { name, email, status } = await req.json();
    if (!name || !email || !status) {
      return NextResponse.json({
        error: "Pleace enter the all required field",
      });
    }
    user.name = name.trim();
    user.email = email.trim();
    user.status = status.trim();
    await user.save();
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
