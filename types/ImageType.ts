import { z } from "zod";

export const ImageSchema = z.object({
  id: z.string(),
  src: z
    .string()
    .refine((value) => value.startsWith("/") || value.startsWith("http"), {
      message:
        "L'image doit être un chemin local commençant par '/' ou une URL commençant par 'http'",
    }),
  alt: z.string(),
  ratio: z.enum(["aspect-square", "aspect-video", "aspect-[4/3]"]),
});

export type ImageType = z.infer<typeof ImageSchema>;
