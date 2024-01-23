import prisma from "@/lib/prisma";
import Markdown from "markdown-to-jsx";
import Article from "../Article";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ArticlePageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ArticlePage({
  params,
  searchParams,
}: ArticlePageProps) {
  const article = await prisma.article.findUnique({
    where: {
      id: params.id,
    },
    include: {
      tags: true,
    },
  });
  if (!article) {
    return <>Article not found</>;
  }
  const tags = article.tags;
  const similarArticles = await prisma.article.findMany({
    where: {
      tags: {
        some: {
          id: {
            in: tags.map((tag) => tag.id),
          },
        },
      },
    },
  });
  const session = await getServerSession(authOptions);

  const isAdmin = session && session.user.role == "ADMIN";
  return (
    <div className="alk-sanet pb-10">
      <h1
        className="text-3xl font-semibold"
        data-astro-transition-scope="astro-X4J6SPKD-2"
      >
        {article.title}
      </h1>
      {/* if user is admin add edit button here */}
      {isAdmin && (
        <Button asChild>
          <Link href={`/articles/${article.id}/edit`}>რედაქტირება</Link>
        </Button>
      )}
      <p className="mt-3 font-bold text-[#e64c39]">13 MIN READ</p>
      <img
        src={article.picture!}
        className="rounded-lg w-full h-[500px] object-cover mt-10"
        alt=""
      />
      <p className="text-center my-5 text-2xl w-3/4 mx-auto font-semibold text-gray-700">
        {article.heading}
      </p>
      <hr className="mt-2 mb-2 border-top-1 w-full h-[1px] bg-body-800 col-span-full transition-all " />
      <div className="py-5 flex justify-between">
        <div>
          {article.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-md bg-white rounded-lg border p-3 text-black mr-2"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div>გამოქვეყნდა: {article.createdAt?.toDateString()}</div>
      </div>
      <div>
        <div className="text-xl">
          <Markdown
            options={{
              wrapper: "p",
            }}
          >
            {article.content}
          </Markdown>
        </div>
      </div>
      <hr className="mt-10 mb-2 border-top-1 w-full h-[1px] bg-body-800 col-span-full transition-all " />

      {/* add facebook share button here */}
      <div className="flex justify-center flex-col gap-10">
        {/* some text to find out more or etc */}
        <h5 className="text-xl font-semibold text-gray-700">
          მსგავსი სტატიები
        </h5>
        <div>
          {similarArticles.map(
            (article) =>
              article.id !== params.id && <Article article={article} />
          )}
        </div>
      </div>
    </div>
  );
}
