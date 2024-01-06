import Hero from "@/components/partial/Hero";
import { getDictionary } from "@/dictionaries";

export default async function Home() {
  const dict = await getDictionary("ka");
  return (
    <main className="flex flex-col">
      <Hero dict={dict} />
      {dict.hero.search}
    </main>
  );
}
