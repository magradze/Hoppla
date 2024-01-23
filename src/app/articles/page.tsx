import prisma from "@/lib/prisma";
import Article from "./Article";

type pageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({ params, searchParams }: pageProps) {
  const articles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
    },
  });
  return (
    <div className="grid grid-cols-2">
      {articles.map((article) => {
        return <Article article={article} />;
      })}
    </div>
  );
}
