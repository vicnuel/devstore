import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  // Para variáveis que precisam estar disponíveis durante o build
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
