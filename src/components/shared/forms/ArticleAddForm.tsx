"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Editor } from "@tinymce/tinymce-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import LANGS from "@/dictionaries/langs";
import { useEffect, useState } from "react";
import S3UploadForm from "./S3UploadForm";
import s3UploadImage from "@/lib/s3UploadImage";
import articleSchema from "@/lib/validation/ArticleSchema";
import { SelectTags } from "./SelectTags";
import { Article, ArticleLanguage, ArticleStatus } from "@prisma/client";
import { useRouter } from "next/navigation";

type ArticleAddFormProps = {
  article?:
    | ({
        tags: {
          id: string;
          name: string;
          createdAt: Date | null;
        }[];
      } & {
        id: string;
        title: string;
        content: string;
        heading: string;
        language: ArticleLanguage;
        picture: string | null;
        status: ArticleStatus;
        createdAt: Date | null;
      })
    | null;
};

export default function ArticleAddForm({ article }: ArticleAddFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      content: "",
      title: "",
      language: undefined,
      picture: "",
      heading: "",
      tags: [],
      status: ArticleStatus.PUBLISHED,
    },
  });

  async function onSubmit(values: z.infer<typeof articleSchema>) {
    // console.log("values", values);
    setLoading(true);
    // for upload
    // values.content = NodeHtmlMarkdown.translate(
    //   /* html */ values.content,
    //   /* options (optional) */ {},
    //   /* customTranslators (optional) */ undefined,
    //   /* customCodeBlockTranslators (optional) */ undefined
    // );

    // if PUT add request search param id

    const result = await fetch(
      `${"/api/articles" + (article ? `/?id=${article.id}` : "")}`,
      {
        method: article ? "PUT" : "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await result.json();
    setLoading(false);
    // TODOS: edit page and publish page, and also single page and pagination for more articles
    // and here it is not changed when i reset form
    // go to article page
    // and also error messages doesnt hide

    localStorage.removeItem("articleAddForm");
    form.reset();
    // go to articles page redirect

    router.push("/articles/" + data.id);
  }

  useEffect(() => {
    form.watch((value) => {
      localStorage.setItem("articleAddForm", JSON.stringify(value));
    });

    if (article) {
      const data = {
        content: article.content,
        heading: article.heading,
        language: article.language,
        picture: article.picture,
        status: article.status,
        title: article.title,
        tags: article.tags.map((tag) => tag.name),
      } as z.infer<typeof articleSchema>;

      form.reset(data);
      return;
    }

    const data = localStorage.getItem("articleAddForm");
    if (data) {
      const parsedData = JSON.parse(data);
      const success = Object.keys(articleSchema.shape).every((key) => {
        return key in parsedData;
      });
      if (success) {
        form.reset(parsedData);
      }
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="some title..." {...field} />
              </FormControl>
              <FormDescription>This is title of article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <SelectTags values={field.value} setValues={field.onChange} />
              </FormControl>
              <FormDescription>This is title of article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heading</FormLabel>
              <FormControl>
                <Input placeholder="some heading..." {...field} />
              </FormControl>
              <FormDescription>This is heading of article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <S3UploadForm
                  onChange={(fileUrl) => {
                    field.onChange(fileUrl);
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>This is title of article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  value={field.value}
                  onEditorChange={(v) => field.onChange(v)}
                  init={{
                    height: 500,

                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                    automatic_uploads: true,
                    images_reuse_filename: true,
                    images_upload_handler: (blobInfo, process) => {
                      return new Promise(async (resolve, reject) => {
                        const fileUrl = await s3UploadImage(blobInfo.blob());
                        resolve(fileUrl);
                      });
                    },
                  }}
                />
              </FormControl>
              <FormDescription>You can write content here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lanuage</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified language " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LANGS.map((l) => (
                    <SelectItem key={l.value} value={l.value.toUpperCase()}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                choose any language that u post is written in
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
