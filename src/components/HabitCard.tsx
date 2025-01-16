'use client'

import type { Habit } from '@/types/habit' // You'll need to create this type file
import { Check, Ellipsis } from 'lucide-react'
import { motion } from 'motion/react'

interface HabitCardProps {
  habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {

  return (
    <div className={'justify flex w-full transition max-w-md flex-col items-center rounded-3xl bg-white px-16 pb-20 shadow-lg'}>
      <Ellipsis className="mb-11 mt-2 text-text" />
      <div className="space-y-4 text-text">
        <p className="font-serif text-4xl font-bold">{habit.habit}</p>
        <p className="text-xl">{habit.when}</p>
        <p className="text-2xl">{habit.why}</p>
      </div>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95, backgroundColor: 'green' }}

        className={'mt-16 rounded-full bg-base p-12 text-text'}
        onClick={() => {
          // TODO: Add completion logic here
          console.log('Habit completed')
        }}
      >
        <Check className="size-24" />
      </motion.button>
    </div>
  )
}
