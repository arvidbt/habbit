'use-client'
import { HydrateClient } from '@/trpc/server'
import { SiteHeader } from '@/components/site-header'
import { auth } from '@/server/auth'
import { FloatingNavbar } from '@/components/floating-navbar'
import { HabitGrid } from '@/components/habit-grid'
import { SignInButton } from '@/components/sign-in-button'
import { Icons } from '@/components/icons'
import { HabitCard } from '@/components/habit-card'
import { type Habit } from '@/server/api/routers/habit'
import { PushNotificationManager } from '@/components/push-notification-manager'
import { InstallPrompt } from '@/components/install-prompt'

export default async function Home() {
  const session = await auth()

  return (
    <HydrateClient>
      <SiteHeader />
      <div>
        <PushNotificationManager />
        <InstallPrompt />
      </div>
      <main className="bg-base mx-auto flex min-h-[calc(100dvh-48px)] w-full max-w-7xl flex-col items-center">
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
    <div className="flex min-h-[calc(100dvh-48px)] w-full flex-col items-center justify-between px-6 md:flex-row">
      <div className="flex flex-col items-center gap-10 py-11 md:items-start md:gap-18">
        <div className="flex flex-col items-center gap-3 md:items-start md:gap-0">
          <h1 className="text-text flex gap-4 font-serif text-7xl font-bold md:text-8xl">
            Habbit <Icons.Rabbit className="text-peach size-18 -rotate-12" />
          </h1>
          <p className="text-subtext0 text-xl md:text-2xl">
            Take <span className="text-mauve">control</span> over your life
          </p>
        </div>
        <SignInButton size="lg">Get started</SignInButton>
      </div>

      <div className="md:bg-subtext0 w-full max-w-md rounded-4xl bg-transparent p-0 md:p-3">
        <div className="bg-base flex h-[680px] w-full flex-col gap-6 rounded-3xl p-2 md:p-11">
          <div>
            <h2 className="text-text text-2xl font-bold">Demo</h2>
            <p className="text-subtext0">
              Try out how habits work with Habbits
            </p>
          </div>
          <HabitCard habit={demoHabit} demo />
        </div>
      </div>
    </div>
  )
}
