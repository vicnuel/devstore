import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type SearchProps = {
  searchParams: {
    q: string;
  };
};

async function getProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    method: "GET",
    next: {
      revalidate: 60 * 5,
    },
  });

  const products = await response.json();

  return products;
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams;

  if (!query) {
    redirect("/");
  }

  const products = await getProducts(query);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            href={`/product/${product.slug}`}
            key={product.id}
            className="relative group rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
          >
            <Image
              src={product.image}
              width={420}
              height={420}
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
    </div>
  );
}
