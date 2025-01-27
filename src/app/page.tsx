import { HydrateClient } from '@/trpc/server'
import { SiteHeader } from '@/components/site-header'
import { auth } from '@/server/auth'
import { FloatingNavbar } from '@/components/floating-navbar'
import { HabitGrid } from '@/components/habit-grid'

export default async function Home() {
  const session = await auth()

  return (
    <HydrateClient>
      <SiteHeader />
      <main className="mx-auto min-h-[calc(100vh-48px)] pt-4 md:pt-11 flex w-full max-w-7xl flex-col items-center">
        {session &&<HabitGrid />}
        {session && <FloatingNavbar />}
      </main>
    </HydrateClient>
  )
}
