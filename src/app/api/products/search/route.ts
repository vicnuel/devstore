import { NextRequest, NextResponse } from "next/server";
import data from "../data.json";
import { z } from "zod";

export async function GET(req: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { searchParams } = req.nextUrl;
  const query = z.string().parse(searchParams.get("q"));

  const product = data.products.filter((product) =>
    product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

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
