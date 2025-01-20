import '@/styles/globals.css'

import { Poppins, Bricolage_Grotesque } from 'next/font/google'
import { type Metadata } from 'next'

import { TRPCReactProvider } from '@/trpc/react'

import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: '--font-sans',
})

const bricolage_grotesque = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-serif',
})

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={cn(
                'latte',
                poppins.variable,
                bricolage_grotesque.variable
            )}
        >
            <body>
                <TRPCReactProvider>
                    {children}
                    <Toaster />
                </TRPCReactProvider>
            </body>
        </html>
    )
}
