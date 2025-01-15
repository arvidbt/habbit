import { HydrateClient } from "@/trpc/server";
import { SiteHeader } from "@/components/site-header";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex w-full flex-col items-center">
        <SiteHeader />
      </main>
    </HydrateClient>
  );
}
