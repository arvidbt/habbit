import { HydrateClient } from '@/trpc/server'
import { SiteHeader } from '@/components/site-header'
import { auth } from '@/server/auth'
import { FloatingNavbar } from '@/components/floating-navbar'
import { HabitGrid } from '@/components/habit-grid'

export default async function Home() {
    const session = await auth()

    return (
        <HydrateClient>
            <main className="flex w-full flex-col items-center">
                <SiteHeader />
                {session && <HabitGrid />}
                {session && <FloatingNavbar />}
            </main>
        </HydrateClient>
    )
}
