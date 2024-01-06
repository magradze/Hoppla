import ArticleAddForm from "@/components/shared/forms/ArticleAddForm";

type ArticleAddPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ArticleAddPage({
  params,
  searchParams,
}: ArticleAddPageProps) {
  return (
    <div>
      <ArticleAddForm />
    </div>
  );
}
