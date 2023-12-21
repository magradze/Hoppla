import Image from 'next/image'
import AuthBlock from "@/components/partial/AuthBlock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthBlock />
    </main>
  )
}
