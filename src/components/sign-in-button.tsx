import { Icons } from './icons'
import { Button } from './ui/button'
import { signIn } from '@/server/auth'
import { PropsWithChildren } from 'react'

type SignInButtonProps = {
  size?: 'sm' | 'lg'
} & PropsWithChildren

export function SignInButton({ children = 'Login', size = "sm" }: SignInButtonProps) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('github')
      }}
    >
      <Button
        size={size}
        effect="expandIcon"
        type="submit"
        icon={Icons.LogIn}
        iconPlacement="right"
      >
        {children}
      </Button>
    </form>
  )
}
