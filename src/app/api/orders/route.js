
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const customerName = String(body.customerName || "").trim();
    const phone = String(body.phone || "").trim();
    const quantity = Number(body.quantity);
    const productId = body.productId;

    if (
      !customerName ||
      customerName.length > 100 ||
      !/^[0-9+ ()-]{7,20}$/.test(phone) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100 ||
      !productId
    ) {
      return NextResponse.json(
        { success: false, message: "Please check your order details." },
        { status: 400 }
      );
    }

    let product = null;

    if (mongoose.Types.ObjectId.isValid(String(productId))) {
      product = await Product.findById(productId);
    }

    if (!product && !Number.isNaN(Number(productId))) {
      product = await Product.findOne({
        legacyId: Number(productId),
      });
    }

    if (!product || !product.isActive) {
      return NextResponse.json(
        { success: false, message: "This product is unavailable." },
        { status: 404 }
      );
    }

    const order = await Order.create({
      productId: product._id.toString(),
      productName: product.name,
      category: product.category,
      price: product.price,
      customerName,
      phone,
      quantity,
      status: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order received successfully!",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to submit order." },
      { status: 500 }
    );
  }
}
