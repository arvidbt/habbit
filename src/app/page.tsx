import Link from "next/link";

import { LatestPost } from "@/components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { HabitCard } from "@/components/HabitCard";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col gap-4  items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <HabitCard habit={{
          habit: "Read for 30 minutes",
          when: "Every morning after breakfast",
          why: "To improve knowledge and focus",
          completed: []
        }} />

        <HabitCard habit={{
          habit: "Read for 30 minutes",
          when: "Every morning after breakfast",
          why: "To improve knowledge and focus",
          completed: []
        }} />
        <HabitCard habit={{
          habit: "Read for 30 minutes",
          when: "Every morning after breakfast",
          why: "To improve knowledge and focus",
          completed: []
        }} />
      </main>
    </HydrateClient>
  );
}
