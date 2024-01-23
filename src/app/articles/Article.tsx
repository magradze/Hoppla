import { ArticleLanguage, ArticleStatus } from "@prisma/client";
import Link from "next/link";

type ArticleProps = {
  article: {
    id: string;
    title: string;
    content: string;
    heading: string;
    language: ArticleLanguage;
    picture: string | null;
    status: ArticleStatus;
    createdAt: Date | null;
  };
};

export default function Article({ article }: ArticleProps) {
  return (
    <div className="flex alk-sanet bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="flex-none w-72 relative">
        <img
          src={article.picture!}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {article.title}
          </h1>
          <div className="text-lg font-semibold text-slate-500">
            13 MIN READ
          </div>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            {article.heading}
          </div>
        </div>
        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              className="h-10 px-6 font-semibold rounded-md bg-black text-white"
              type="submit"
            >
              <Link href={`/articles/${article.id}`}>წაიკითხე</Link>
            </button>
            {/* <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
              type="button"
            >
              Add to bag
            </button> */}
          </div>
        </div>
        <p className="text-sm text-slate-700">
          {article.createdAt?.toLocaleDateString(
            "en-US",
            {} as Intl.DateTimeFormatOptions
          )}
        </p>
      </form>
    </div>
  );
}
