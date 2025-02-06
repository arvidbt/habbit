'use client'
import { type AnimationSequence, motion, useAnimate } from 'motion/react'
import { useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { capitalizeFirst, cn } from '@/lib/utils'
import { type Habit } from '@/server/api/routers/habit'
import { api } from '@/trpc/react'

import posthog from 'posthog-js'
import { Icons } from './icons'
import { HabitForm } from './habit-form'

interface HabitCardProps {
  habit: Habit
  demo?: boolean
  compact?: boolean
}

export const HabitCard = ({ habit, demo, compact }: HabitCardProps) => {
  const [scope, animate] = useAnimate()
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

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
          ' linear-gradient(61deg, rgba(0,18,36,0.8393951330532212) 0%, rgba(17,185,35,1) 35%, rgba(0,255,186,0.4) 100%)',
        opacity: 1,
        height: '300%',
        left: '50%',
        aspectRatio: 1 / 1,
      },
      { duration: 0.8 }
    )

    animate(
      '#check-button',
      { background: 'rgba(var(--ctp-base),0)' },
      { duration: 0.4 }
    )

    const buttonSequence = [
      ['#check-button', { scale: 0.5 }, { duration: 0.9 }],
      ['#check-button', { scale: 2.5 }, { duration: 0.3 }],
      ['#check-button', { scale: 1.5 }, { duration: 0.2 }],
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
        left: compact ? '80%' : '50%',
      },
      { duration: 0.8 }
    )
    animate(
      '#check-button',
      { scale: 1, background: 'rgba(var(--ctp-base),1)' },
      { duration: 0.8 }
    )
    animate('#count', { rotate: 0, scale: 1 }, { duration: 0.3 })
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
    <motion.div
      ref={scope}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative w-full overflow-clip rounded-3xl bg-white shadow-lg',
        compact ? 'max-w[600px] h-[200px]' : 'h-[75vh] md:h-[44rem]',
        demo && 'h-full max-w-[400px]'
      )}
    >
      <div
        id="count"
        className={cn(
          isCompleted ? 'from-sapphire to-green' : 'from-sky to-blue',
          'bg-peach bg-linear-to-r absolute right-2 top-2 z-50 flex items-center gap-1 rounded-xl px-3 py-1.5'
        )}
      >
        <Icons.Zap className="size-6" />
        <p className="text-xl">1</p>
      </div>

      <span
        id="backdrop"
        className={cn(
          'absolute bottom-[25%] left-1/2 h-0 -translate-x-1/2 translate-y-1/2 rounded-full',
          demo && 'bottom-[20%]',
          compact && 'bottom-[50%] left-[80%]'
        )}
      ></span>

      <div
        id="content"
        className={cn(
          'justify absolute inset-0 flex flex-col items-center gap-11 px-6 pb-16 shadow-lg md:px-16',
          demo && 'pb-8',
          compact && 'pb-0'
        )}
      >
        {!compact && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="mt-2"
                  onClick={() => {
                    setIsEditing(!isEditing)
                  }}
                >
                  <Icons.Ellipsis className="text-text" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redigera vana</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <div
          className={cn(
            'flex h-full min-w-1/2 flex-col items-center justify-between',
            compact && 'w-full flex-row items-center justify-between'
          )}
        >
          <div id="habit-text-container" className="text-text w-full space-y-4">
            {isEditing && !compact ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <HabitForm
                  demo={demo}
                  habit={habit}
                  onSuccess={() => setIsEditing(false)}
                />
              </motion.div>
            ) : (
              <HabitText habit={habit} compact={compact} />
            )}
          </div>

          <motion.button
            onContextMenu={(e) => e.preventDefault()}
            disabled={isCompleted}
            onTapStart={() => !isCompleted && handleHoldStart()}
            onTap={handleHoldEnd}
            onTapCancel={handleHoldEnd}
            id="check-button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className={cn(
              'text-text bg-base rounded-full p-12',
              demo && 'p-10',
              compact && 'p-8'
            )}
          >
            <Icons.Check
              className={cn('size-24', demo && 'size-18', compact && 'size-12')}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

const HabitText = ({ habit, compact }: { habit: Habit; compact?: boolean }) => {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: [0.2, 0.71, 0.2, 1.01], duration: 0.5 }}
        className={cn(
          'font-serif font-bold',
          compact ? 'text-3xl' : 'text-4xl'
        )}
      >
        {capitalizeFirst(habit.what)}
      </motion.p>
      {!compact && (
        <>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              ease: [0.2, 0.71, 0.2, 1.01],
              duration: 0.3,
              delay: 0.1,
            }}
            className="text-xl"
          >
            {capitalizeFirst(habit.when)}
          </motion.p>
          <p className="text-subtext0 italic">so I can</p>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              ease: [0.2, 0.71, 0.2, 1.01],
              duration: 0.3,
              delay: 0.2,
            }}
            className="text-2xl"
          >
            {capitalizeFirst(habit.why)}
          </motion.p>
        </>
      )}
    </>
  )
}
