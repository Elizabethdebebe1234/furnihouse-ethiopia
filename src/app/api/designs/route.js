
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Design from "@/models/Design";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const customerName = String(body.customerName || "").trim();
    const phone = String(body.phone || "").trim();
    const category = String(body.category || "").trim();
    const photo = String(body.photo || "");

    if (
      !customerName ||
      customerName.length > 100 ||
      !/^[0-9+ ()-]{7,20}$/.test(phone) ||
      !category ||
      category.length > 100 ||
      photo.length > 3200000
    ) {
      return NextResponse.json(
        { success: false, message: "Please check your design details." },
        { status: 400 }
      );
    }

    const design = await Design.create({
      category,
      length: String(body.length || ""),
      width: String(body.width || ""),
      color: String(body.color || ""),
      appointment: String(body.appointment || ""),
      photo,
      notes: String(body.notes || "").slice(0, 2000),
      customerName,
      phone,
      status: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Design request received successfully!",
        design,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create design error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to submit design request." },
      { status: 500 }
    );
  }
}
