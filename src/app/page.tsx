import { HydrateClient } from '@/trpc/server'
import { SiteHeader } from '@/components/site-header'
import { auth } from '@/server/auth'
import { FloatingNavbar } from '@/components/floating-navbar'
import { HabitGrid } from '@/components/habit-grid'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@/components/sign-in-button'
import { Icons } from '@/components/icons'

export default async function Home() {
  const session = await auth()

  return (
    <HydrateClient>
      <SiteHeader />
      <main className="flex w-full min-h-[calc(100dvh-48px)] flex-col items-center bg-base">
        {session ? <>
          <HabitGrid />
          <FloatingNavbar />
        </> :
          <NotLoggedInStartPage />
        }
      </main>
    </HydrateClient>
  )
}

function NotLoggedInStartPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[calc(100dvh-48px)] items-center">
      <div className='mx-auto space-y-18'>
        <div className="space-y-4">
          <h1 className='text-text text-8xl font-bold flex gap-4 font-serif'>Habbit <Icons.Rabbit className='size-18 text-peach -rotate-12' /></h1>
          <p className='text-subtext0 text-2xl'>Take <span className='text-mauve'>control</span> over your life</p>
        </div>
        <SignInButton size='lg' >
          Get started
        </SignInButton >
      </div>
      <div className='border border-2 border-subtext0 rounded-4xl w-[380px] h-[680px] mx-auto'>
      </div>
    </div>
  )
}
