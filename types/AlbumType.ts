import { z } from "zod";
import { ImageSchema } from "@/types/ImageType";

export const AlbumSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  photographer: z.string(),
  images: z.array(ImageSchema),
});

export type AlbumType = z.infer<typeof AlbumSchema>;
