import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

type AdmnPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AdmnPage({
  params,
  searchParams,
}: AdmnPageProps) {
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
