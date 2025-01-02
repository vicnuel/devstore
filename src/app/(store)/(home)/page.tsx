import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api("/products/featured", {
    method: "GET",
    next: {
      revalidate: 60, // faz a requisição a cada 60 segundos, ou seja, o primeiro acesso vai até o servidor, mas os próximos acessos vão ser servidos pelo cache
    },
  });

  const products = await response.json();

  return products;
}

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  // const wait = await new Promise((resolve) => setTimeout(resolve, 2000));

  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts();

  return (
    <div className="grid max-h-[800px] grid-cols-9 grid-rows-6 gap-4">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
      >
        <Image
          src={highlightedProduct.image}
          width={960}
          height={960}
          className="group-hover:scale-105 transition-transform duration-300"
          alt=""
          quality={100}
          // className="max-w-85"
        />
        <div className="absolute bottom-24 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map((product) => (
        <Link
          href={`/product/${product.slug}`}
          key={product.id}
          className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
        >
          <Image
            src={product.image}
            width={960}
            height={960}
            alt=""
            className="group-hover:scale-105 transition-transform duration-300"
            quality={100}
            // className="max-w-85"
          />

          <div className="absolute bottom-10 right-5 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
