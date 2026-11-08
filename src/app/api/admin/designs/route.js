
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Design from "@/models/Design";
import { isAdminRequest } from "@/lib/adminAuth";


export async function GET(request) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const designs = await Design.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      designs: designs.map((design) => ({
        ...design,
        id: design._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Fetch designs error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch designs." },
      { status: 500 }
    );
  }
}
