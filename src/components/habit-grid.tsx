'use client'
import React from 'react'
import { HabitCard } from './habit-card'
import { api } from '@/trpc/react'

export const HabitGrid = () => {
  const habits = api.habit.getHabits.useQuery().data

  if (!habits) return <p>Click plus button to add habits</p>

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-6">
      {habits.map((habit, i) => {
        if (!habit) {
          return <p key={i}>no habitsius</p>
        }
        return <HabitCard key={i} habit={habit} />
      })}
    </div>
  )
}
