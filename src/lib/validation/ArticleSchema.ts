import LANGS from "@/dictionaries/langs";
import { ArticleLanguage, ArticleStatus } from "@prisma/client";
import { z } from "zod";

const LANGS_VALUES = Array.from(new Set(Object.values(ArticleLanguage)));

const STATUS_VALUES = Array.from(new Set(Object.values(ArticleStatus)));

const articleSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  heading: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
  tags: z
    .array(z.string().min(2, { message: "Tag must be at least 2 characters." }))
    .min(1, { message: "At least one tag is required." }),
  content: z.string().min(1, {
    message: "Content should not be empty.",
  }),
  language: z.enum([LANGS_VALUES[0], ...LANGS_VALUES.slice(1)]),
  picture: z.string().refine((val) => val.length > 0, {
    message: "Picture is required.",
  }),
  status: z.enum([STATUS_VALUES[0], ...STATUS_VALUES.slice(1)]),
});

export default articleSchema;
