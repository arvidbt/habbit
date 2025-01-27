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
      <main className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <HabitGrid />
        {session && <FloatingNavbar />}
      </main>
    </HydrateClient>
  )
}
