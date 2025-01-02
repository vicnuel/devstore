import { AddToCardButton } from "@/components/card/add-to-card-button";
import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import { Metadata } from "next";
import Image from "next/image";

type ProductProps = {
  params: {
    slug: string;
  };
};

async function getProduct(slug: string): Promise<Product> {
  const response = await api("/products/" + slug, {
    method: "GET",
    next: {
      revalidate: 60 * 5, // faz a requisição a cada 5 minutos, ou seja, o primeiro acesso vai até o servidor, mas os próximos acessos vão ser servidos pelo cache
    },
  });

  const products = await response.json();

  return products;
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: product.title,
  };
}

export async function generateStaticParams() {
  const response = await api("/products/featured");
  const products: Product[] = await response.json();
  return products.map((product) => {
    return {
      slug: product.slug,
    };
  });
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug);

  //   console.log(product);
  return (
    <div className="relative grid max-h-[800px] grid-cols-3">
      <div className="col-span-2 overflow-hidden group">
        <Image
          src={product.image}
          width={960}
          height={960}
          // cursor zoom
          className="group-hover:scale-105 transition-transform duration-300 cursor-zoom-in"
          alt=""
          quality={100}
          // className="max-w-85"
        />
      </div>
      <div className="col-span-1 flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2 font-semibold">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span>
            Em 12x s/ juros de{" "}
            <span>
              {(product.price / 12).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex w-14 h-9 items-center justify-center rounded-full border-zinc-700 border bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex w-14 h-9 items-center justify-center rounded-full border-zinc-700 border bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex w-14 h-9 items-center justify-center rounded-full border-zinc-700 border bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex w-14 h-9 items-center justify-center rounded-full border-zinc-700 border bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCardButton productId={product.id} />
      </div>
    </div>
  );
}
