import { HydrateClient } from '@/trpc/server'
import { SiteHeader } from '@/components/site-header'
import { auth } from '@/server/auth'
import { FloatingNavbar } from '@/components/floating-navbar'
import { HabitGrid } from '@/components/habit-grid'
import { SignInButton } from '@/components/sign-in-button'
import { Icons } from '@/components/icons'
import { HabitCard } from '@/components/habit-card'
import { type Habit } from '@/server/api/routers/habit'

export default async function Home() {
  const session = await auth()

  return (
    <HydrateClient>
      <SiteHeader />
      <main className="bg-base flex min-h-[calc(100dvh-48px)] w-full flex-col items-center">
        {session ? (
          <>
            <HabitGrid />
            <FloatingNavbar />
          </>
        ) : (
          <NotLoggedInStartPage />
        )}
      </main>
    </HydrateClient>
  )
}

function NotLoggedInStartPage() {
  const demoHabit: Habit = {
    what: 'Walk the dog',
    why: 'To exercise',
    when: 'Every day',
    createdById: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0,
  }

  return (
    <div className="grid min-h-[calc(100dvh-48px)] w-full grid-cols-1 items-center md:grid-cols-2">
      <div className="mx-auto space-y-18">
        <div className="space-y-4">
          <h1 className="text-text flex gap-4 font-serif text-8xl font-bold">
            Habbit <Icons.Rabbit className="text-peach size-18 -rotate-12" />
          </h1>
          <p className="text-subtext0 text-2xl">
            Take <span className="text-mauve">control</span> over your life
          </p>
        </div>
        <SignInButton size="lg">Get started</SignInButton>
      </div>
      <div className="border-subtext0 bg-subtext0 mx-auto w-min rounded-4xl border-2 p-2">
        <div className="border-subtext0 bg-base flex h-[680px] w-[380px] flex-col gap-6 rounded-3xl border-2 p-11">
          <h2 className="text-text text-2xl font-bold">Your habits</h2>
          <HabitCard habit={demoHabit} demo />
        </div>
      </div>
    </div>
  )
}
