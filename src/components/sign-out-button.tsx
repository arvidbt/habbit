import { Button } from './ui/button'
import { signOut } from '@/server/auth'

export function SignOutButton() {
    return (
        <form
            action={async () => {
                'use server'
                await signOut()
            }}
        >
            <Button type="submit" className="py-1 text-sm">
                Sign Out
            </Button>
        </form>
    )
}
