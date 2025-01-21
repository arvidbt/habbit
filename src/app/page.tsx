import { HydrateClient } from '@/trpc/server'
import { SiteHeader } from '@/components/site-header'
import { auth } from '@/server/auth'
import { FloatingNavbar } from '@/components/floating-navbar'
import { type Habit } from '@/types/habit'
import { HabitCard } from '@/components/habit-card'

export default async function Home() {
  const session = await auth()
  const habit: Habit = {
    habit: 'fixa mitt tangentbord',
    when: 'nu',
    why: 'Så att jag kan skriva kod and make money',
    completed: [],
  }
  return (
    <HydrateClient>
      <main className="flex w-full flex-col items-center">
        <SiteHeader />
        <HabitCard habit={habit} />
        {session && <FloatingNavbar />}
      </main>
    </HydrateClient>
  )
}
