import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";

type layoutProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
};

export default async function layout({
  children,
  params,
  searchParams,
}: layoutProps) {
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== "ADMIN") notFound();

  return (
    <div className="page-wrapper px-4 sm:px-6 lg:px-8 pt-6">{children}</div>
  );
}
