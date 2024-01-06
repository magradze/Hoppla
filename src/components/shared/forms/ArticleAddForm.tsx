"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import S3UploadForm from "./S3UploadForm";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
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

type ArticleAddFormProps = {};

export default function ArticleAddForm({}: ArticleAddFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      title: "",
      language: "",
      picture: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // upload here and loading scene also
  }

  useEffect(() => {
    form.watch((value) => {
      localStorage.setItem("articleAddForm", JSON.stringify(value));
    });
    const data = localStorage.getItem("articleAddForm");
    if (data) {
      const parsedData = JSON.parse(data);
      console.log(Object.keys(formSchema.shape), parsedData);
      const success = Object.keys(formSchema.shape).every((key) => {
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
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <S3UploadForm
                  onChange={(fileUrl) => {
                    form.setValue("picture", fileUrl);
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
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  {...field}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified language " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LANGS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
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
