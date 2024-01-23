import ArticleAddForm from "@/components/shared/forms/ArticleAddForm";
import prisma from "@/lib/prisma";

type ArticleEditPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ArticleEditPage({
  params,
  searchParams,
}: ArticleEditPageProps) {
  const { id } = params;
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      tags: true,
    },
  });
  return (
    <div>
      <ArticleAddForm article={article} />
    </div>
  );
}
