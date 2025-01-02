import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import { env } from "@/env";
// import Image from "next/image";
import { ImageResponse } from "next/og";
import colors from "tailwindcss/colors";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
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

export const contentType = "image/png";

// Image generation
export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  const urlImage = new URL(product.image, env.APP_URL).toString();

  console.log(urlImage);
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: colors.zinc[950],
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={urlImage}
          alt={alt}
          style={{
            // objectFit: "cover",
            width: "100%",
            // height: "100%",
          }}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
