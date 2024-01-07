import LANGS from "@/dictionaries/langs";
import { z } from "zod";

const articleSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(1, {
    message: "Content should not be empty.",
  }),
  language: z
    .string()
    .refine((val) => LANGS.map((l) => l.value).includes(val), {
      message: "Language is not valid.",
    }),
  picture: z.string().refine((val) => val.length > 0, {
    message: "Picture is required.",
  }),
});

export default articleSchema;
