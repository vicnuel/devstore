import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  APP_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "invalid environment variables",
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error(parsedEnv.error.errors.join("\n"));
}

export const env = parsedEnv.data;
