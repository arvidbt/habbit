'use client'
import React, { useState } from 'react'
import { HabitCard } from './habit-card'
import { api } from '@/trpc/react'
import { motion } from 'motion/react'
import { Button } from './ui/button'

export const HabitGrid = () => {
  const [compactView, setCompactView] = useState(false)
  const habits = api.habit.getHabits.useQuery().data

  if (!habits) return <p>Click plus button to add habits</p>

  return (
    <div className="grid w-full grid-cols-1 gap-8">
      <Button
        variant="outline"
        onClick={() => setCompactView(!compactView)}
        className="mr-11 place-self-end"
      >
        {compactView ? 'Big view' : 'Compact view'}
      </Button>
      <div className="sm:responsive-grid-[23rem] grid w-full items-center gap-6 px-4 md:px-11">
        {habits.map((habit, i) => {
          if (!habit) {
            return <p key={i}>Something went wrong when fetching this habit</p>
          }
          return (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <HabitCard habit={habit} compact={compactView} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
