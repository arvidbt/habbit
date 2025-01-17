'use client'

import { cn } from '@/lib/utils'
import type { Habit } from '@/types/habit'
import { Check, Ellipsis } from 'lucide-react'
import { motion, useAnimate, useAnimation } from 'motion/react'
import { useEffect, useState } from 'react'

interface HabitCardProps {
  habit: Habit
}


export function HabitCard({ habit }: HabitCardProps) {
  const [scope, animate] = useAnimate()
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const durationContainer = 0.8
  const durationButton = 0.8
  const handleHoldStart = () => {
    animate("#backdrop", { backgroundColor: "green", width: "100%", height: "100%", borderRadius: '1.5rem' }, { duration: durationContainer })
    animate("#check-button", { backgroundColor: "green", scale: 2 }, { duration: durationButton })
    setHoldTimeout(setTimeout(() => {
      setIsCompleted(true)
    }, 3000))
  }

  const handleHoldEnd = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout)
      setHoldTimeout(null)
    }
    if (!isCompleted) {
      animate("#backdrop", { backgroundColor: "white", width: 0, height: 0, borderRadius: '100%' }, { duration: durationContainer })
      animate("#check-button", { backgroundColor: "white", scale: 1 }, { duration: durationButton })
    }
  }

  return (
    <div
      ref={scope}
      className='grid *:row-start-1 *:col-start-1 bg-white rounded-3xl overflow-clip shadow-lg'
    >
      <span id="backdrop" className='bg-white w-0 h-0 place-self-center rounded-full'>
      </span>


      <div id="content"
        className='justify flex w-full max-w-md flex-col items-center px-16 pb-20 shadow-lg'
      >
        <Ellipsis className="mb-11 mt-2 text-text" />
        <div className="space-y-4 text-text">
          <p className="font-serif text-4xl font-bold">{habit.habit}</p>
          <p className="text-xl">{habit.when}</p>
          <p className="text-2xl">{habit.why}</p>
        </div>

        <motion.button
          id="check-button"
          onContextMenu={(e) => e.preventDefault()}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onTapStart={handleHoldStart}
          onTap={handleHoldEnd}
          onTapCancel={handleHoldEnd}
          className='mt-16 rounded-full bg-base p-12 text-text'
        >
          <Check className="size-24" />
        </motion.button>
      </div>
    </div>
  )
}
