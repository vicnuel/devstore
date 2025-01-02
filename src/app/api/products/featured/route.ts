import { NextResponse } from "next/server";
import data from "../data.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(data.products.filter((product) => product.featured));
}
