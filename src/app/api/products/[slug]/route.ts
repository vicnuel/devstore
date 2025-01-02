import { NextRequest, NextResponse } from "next/server";
import data from "../data.json";
import { z } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const slug = z.string().parse(params.slug);

  const product = data.products.find((product) => product.slug === slug);

  if (!product) {
    return NextResponse.json(
      {
        message: "Product not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(product);
}
