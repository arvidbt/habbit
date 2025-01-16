import Link from 'next/link'
import { SignInButton } from './sign-in-button'
import { siteConfig } from '@/config/site.config'
import { auth } from '@/server/auth'
import { SignOutButton } from './sign-out-button'

export async function SiteHeader() {
    const session = await auth()
    return (
        <header role="banner" className="w-screen">
            <div className="flex items-center justify-between p-2">
                <Link href={siteConfig.url}>
                    <h1 id="site-title" className="text-2xl font-black">
                        {siteConfig.name}
                    </h1>
                </Link>
                <div className="space-x-2">
                    {session ? <SignOutButton /> : <SignInButton />}
                </div>
            </div>
        </header>
    )
}
