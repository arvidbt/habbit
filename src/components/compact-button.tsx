'use client'
import React from 'react'
import { Button } from './ui/button'
import { Icons } from './icons'
import { useHabitActions } from '@/stores/habitStore'

export const CompactButton = () => {
  const { toggleCompactMode } = useHabitActions()
  return (
    <Button
      size={'icon'}
      onClick={() => {
        console.log('clicked')
        toggleCompactMode()
      }}
    >
      <Icons.Layers />
    </Button>
  )
}
