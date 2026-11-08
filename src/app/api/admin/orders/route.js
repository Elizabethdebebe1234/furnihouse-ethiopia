
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
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

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      orders: orders.map((order) => ({
        ...order,
        id: order._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Fetch orders error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch orders." },
      { status: 500 }
    );
  }
}
