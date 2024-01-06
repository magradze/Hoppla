import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type AdminPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AdminPage({
  params,
  searchParams,
}: AdminPageProps) {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  const adminUsers = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
  });

  return (
    <div>
      <p>Welcome {user.name}!</p>
      {/* Add new article */}
      <Button variant="default" asChild={true}>
        <Link href="/admin/article/add">Add new article</Link>
      </Button>
      <p>Admins:</p>
      <ul>
        {adminUsers.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
