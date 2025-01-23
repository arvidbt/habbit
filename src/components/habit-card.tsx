'use client'
import { Check, Ellipsis, Zap } from 'lucide-react'
import { type AnimationSequence, motion, useAnimate } from 'motion/react'
import { useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { cn } from '@/lib/utils'
import { type Habit } from '@/server/api/routers/habit'
import { api } from '@/trpc/react'

import posthog from 'posthog-js'

interface HabitCardProps {
  habit: Habit
}

export const HabitCard = ({ habit }: HabitCardProps) => {
  const [scope, animate] = useAnimate()
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const completeHabit = api.habit.complete.useMutation({
    onSuccess: async () => {
      console.log('completed habit')
    },
  })

  const completedAnimation = () => {
    animate(
      '#backdrop',
      {
        background:
          ' linear-gradient(61deg, rgba(0,18,36,0.8393951330532212) 0%, rgba(17,185,35,1) 35%, rgba(0,255,186,1) 100%)',
        opacity: 1,
        height: '175%',
        aspectRatio: 1 / 1,
      },
      { duration: 0.8 }
    )

    animate(
      '#check-button',
      { background: 'rgba(239, 241, 245, 0)' },
      { duration: 0.4 }
    )

    const buttonSequence = [
      ['#check-button', { scale: 0.5 }, { duration: 0.9 }],
      ['#check-button', { scale: 2.5 }, { duration: 0.3 }],
      ['#check-button', { scale: 2 }, { duration: 0.2 }],
      ['#count', { rotate: 10, scale: 1.1 }, { duration: 0.1 }],
      ['#count', { rotate: -10, scale: 1.2 }, { duration: 0.2 }],
      ['#count', { rotate: 0, scale: 1 }, { duration: 0.3 }],
    ] as AnimationSequence

    animate(buttonSequence)
  }

  const notCompletedAnimation = () => {
    animate(
      '#backdrop',
      {
        height: '0',
        opacity: 0,
      },
      { duration: 0.8 }
    )
    animate(
      '#check-button',
      { scale: 1, background: 'rgba(239, 241, 245, 1)' },
      { duration: 0.8 }
    )
  }

  const handleHoldStart = () => {
    completedAnimation()
    setHoldTimeout(
      setTimeout(() => {
        setIsCompleted(true)
        completeHabit.mutate({ habitId: habit.id })
        posthog.capture('habit-completed', { id: habit.id })
      }, 1200)
    )
  }

  const handleHoldEnd = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout)
      setHoldTimeout(null)
    }
    if (!isCompleted) {
      notCompletedAnimation()
    }
  }

  return (
    <div
      ref={scope}
      className="relative h-[80dvh] w-full max-w-[400px] overflow-clip rounded-3xl bg-white shadow-lg"
    >
      <div
        id="count"
        className={cn(
          isCompleted ? 'from-sapphire to-green' : 'from-sky to-blue',
          'absolute right-2 top-2 z-50 flex items-center gap-1 rounded-xl bg-peach bg-gradient-to-r px-3 py-1.5'
        )}
      >
        <Zap className="size-6" />
        <p className="text-xl">1</p>
      </div>

      <span
        id="backdrop"
        className="absolute bottom-[25%] left-1/2 h-0 -translate-x-1/2 translate-y-1/2 rounded-full"
      ></span>

      <div
        id="content"
        className="justify absolute inset-0 flex max-w-md flex-col items-center justify-between px-6 pb-16 shadow-lg md:px-16"
      >
        <div className="mt-2 flex flex-col items-center gap-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    console.log('open habit editor')
                  }}
                >
                  <Ellipsis className="text-text" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redigera vana</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div id="habit-text-container" className="space-y-4 text-text">
            <motion.p
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                ease: [0, 0.71, 0.2, 1.01],
                duration: 0.5,
              }}
              className="font-serif text-4xl font-bold"
            >
              {habit.what}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                ease: [0, 0.71, 0.2, 1.01],
                duration: 0.5,
              }}
              className="text-xl"
            >
              {habit.when}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                ease: [0, 0.71, 0.2, 1.01],
                duration: 0.5,
              }}
              className="text-2xl"
            >
              {habit.why}
            </motion.p>
          </div>
        </div>

        <motion.button
          onContextMenu={(e) => e.preventDefault()}
          disabled={isCompleted}
          id="check-button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          onTapStart={() => !isCompleted && handleHoldStart()}
          onTap={handleHoldEnd}
          onTapCancel={handleHoldEnd}
          className="rounded-full bg-base p-12 text-text"
        >
          <Check className="size-24" />
        </motion.button>
      </div>
    </div>
  )
}
