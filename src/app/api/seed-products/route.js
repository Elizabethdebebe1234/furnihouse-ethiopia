
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import {
  products,
  getLocalizedProduct,
} from "@/data/products";

export async function POST(request) {
  try {
    const secret = request.headers.get("x-seed-secret");

    if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const operations = products.map((product) => {
      const am = getLocalizedProduct(product, "am");
      const om = getLocalizedProduct(product, "om");

      return {
        updateOne: {
          filter: { legacyId: product.id },
          update: {
            $set: {
              legacyId: product.id,
              name: product.name,
              description: product.description,
              category: product.category,
              price: product.price,
              image: product.image,
              translations: {
                am: { name: am.name, description: am.description },
                om: { name: om.name, description: om.description },
              },
              isActive: true,
            },
          },
          upsert: true,
        },
      };
    });

    await Product.bulkWrite(operations);

    return NextResponse.json({
      success: true,
      message: "FurniHouse products imported successfully!",
      count: products.length,
    });
  } catch (error) {
    console.error("Seed error:", error);

    return NextResponse.json(
      { success: false, message: "Product import failed" },
      { status: 500 }
    );
  }
}
