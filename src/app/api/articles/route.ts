import prisma from "@/lib/prisma";
import articleSchema from "@/lib/validation/ArticleSchema";
import { ArticleLanguage, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        heading: true,
        content: true,
        language: true,
        picture: true,
        status: true,
        tags: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ articles });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const values = articleSchema.parse(body);
    // let content = NodeHtmlMarkdown.translate(
    //   /* html */ values.content,
    //   /* options (optional) */ {},
    //   /* customTranslators (optional) */ undefined,
    //   /* customCodeBlockTranslators (optional) */ undefined
    // );
    const article = await prisma.article.create({
      data: {
        title: values.title,
        content: values.content,
        heading: values.heading,
        language: values.language,
        picture: values.picture,
        status: values.status,

        tags: {
          connectOrCreate: values.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });

    return NextResponse.json({
      id: article.id,
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const query = req.nextUrl.searchParams;
  const id = query.get("id");
  if (!id) return NextResponse.json({ error: "No ID provided." });
  try {
    const values = articleSchema.parse(body);
    // let content = NodeHtmlMarkdown.translate(
    //   /* html */ values.content,
    //   /* options (optional) */ {},
    //   /* customTranslators (optional) */ undefined,
    //   /* customCodeBlockTranslators (optional) */ undefined
    // );
    const article = await prisma.article.update({
      where: {
        id: id,
      },
      data: {
        title: values.title,
        content: values.content,
        heading: values.heading,
        language: values.language,
        picture: values.picture,
        status: values.status,

        tags: {
          // disconnect: values.tags.map((tag) => ({ name: tag })),
          connectOrCreate: values.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });

    return NextResponse.json({
      id: article.id,
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
