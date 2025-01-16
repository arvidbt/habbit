import { HydrateClient } from '@/trpc/server'
import { SiteHeader } from '@/components/site-header'
import { auth } from '@/server/auth'

export default async function Home() {
    const session = await auth()

    console.log(session)
    return (
        <HydrateClient>
            <main className="flex w-full flex-col items-center">
                <SiteHeader />
            </main>
        </HydrateClient>
    )
}
