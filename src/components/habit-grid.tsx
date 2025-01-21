'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { HabitCard } from './habit-card'

export const HabitGrid = () => {
  const habits = api.habit.getHabits.useQuery().data
  if (!habits) {
    return
  }

  console.log(habits)
  return (
    <div className="flex h-screen w-full flex-col items-center gap-6">
      {habits.map((habit, i) => {
        if (!habit) {
          return <p key={i}>no habitsius</p>
        }
        return <HabitCard key={i} habit={habit} />
      })}
    </div>
  )
}
