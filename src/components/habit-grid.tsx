'use client'
import React from 'react'
import { HabitCard } from './habit-card'
import { api } from '@/trpc/react'

export const HabitGrid = () => {
  const habits = api.habit.getHabits.useQuery().data

  if (!habits) return <p>Click plus button to add habits</p>

  return (
    <div className="sm:responsive-grid-[23rem] grid min-h-screen w-full items-center gap-6 px-4 md:px-11">
      {habits.map((habit, i) => {
        if (!habit) {
          return <p key={i}>Something went wrong when fetching this habit</p>
        }
        return <HabitCard key={i} habit={habit} />
      })}
    </div>
  )
}
