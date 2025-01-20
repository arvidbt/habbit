import { Icons } from './icons'
import { Button } from './ui/button'
import { signIn } from '@/server/auth'

export function SignInButton() {
    return (
        <form
            action={async () => {
                'use server'
                await signIn('github')
            }}
        >
            <Button
                size={'sm'}
                effect="expandIcon"
                type="submit"
                icon={Icons.LogIn}
                iconPlacement="right"
            >
                Login
            </Button>
        </form>
    )
}
