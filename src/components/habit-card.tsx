'use client'
import { type AnimationSequence, motion, useAnimate } from 'motion/react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { capitalizeFirst, cn } from '@/lib/utils'
import { type Habit } from '@/server/api/routers/habit'
import { Icons } from './icons'
import { HabitForm } from './habit-form'

interface HabitCardProps {
  habit: Habit
  compact?: boolean
  isCompleted: boolean
  completions?: number
  onComplete: (habitId: number) => void
}

export const HabitCard = (props: HabitCardProps) => {
  const [scope, animate] = useAnimate()
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [localComplete, setLocalComplete] = useState(false)

  const completedAnimation = () => {
    animate(
      '#backdrop',
      {
        background:
          'linear-gradient(45deg, var(--color-lime-500) 0%, var(--color-green-500) 50%, var(--color-emerald-500) 100%)',
        opacity: 1,
        height: '300%',
        left: '50%',
        aspectRatio: 1 / 1,
      },
      { duration: 1 }
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
    if (props.isCompleted) return
    animate(
      '#backdrop',
      {
        height: '0',
        opacity: 0,
        left: props.compact ? '80%' : '50%',
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
        props.onComplete(props.habit.id)
        setLocalComplete(true)
      }, 700)
    )
  }

  const handleHoldEnd = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout)
      setHoldTimeout(null)
    }
    if (!localComplete) {
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
        props.compact ? 'max-w[600px] h-[200px]' : 'h-[75vh] md:h-[44rem]'
      )}
    >
      <div
        id="count"
        className={cn(
          props.isCompleted ? 'from-sapphire to-green' : 'from-sky to-blue',
          'bg-peach absolute top-2 right-2 z-50 flex items-center gap-1 rounded-xl bg-linear-to-r px-3 py-1.5'
        )}
      >
        <Icons.Zap className="size-6" />
        <p className="text-xl">{props.completions}</p>
      </div>

      <span
        id="backdrop"
        className={cn(
          'absolute bottom-[25%] left-1/2 h-0 -translate-x-1/2 translate-y-1/2 rounded-full',
          props.compact && 'bottom-[50%] left-[80%]',
          props.isCompleted &&
            'bottom-0 aspect-square h-[300%] translate-y-0 rounded-none bg-linear-to-tr from-lime-500 via-green-500 to-emerald-500 opacity-100'
        )}
      ></span>

      <div
        id="content"
        className={cn(
          'justify absolute inset-0 flex flex-col items-center gap-11 px-6 pb-16 shadow-lg md:px-16',
          props.compact && 'pb-0'
        )}
      >
        {!props.compact && (
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
            props.compact && 'w-full flex-row items-center justify-between'
          )}
        >
          <div id="habit-text-container" className="text-text w-full space-y-4">
            {isEditing && !props.compact ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <HabitForm
                  habit={props.habit}
                  onSuccess={() => setIsEditing(false)}
                />
              </motion.div>
            ) : (
              <HabitText habit={props.habit} compact={props.compact} />
            )}
          </div>

          <motion.button
            onContextMenu={(e) => e.preventDefault()}
            disabled={props.isCompleted}
            onTapStart={() => !props.isCompleted && handleHoldStart()}
            onTap={handleHoldEnd}
            onTapCancel={handleHoldEnd}
            id="check-button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className={cn(
              'text-text bg-base rounded-full p-12',
              props.compact && 'p-8',
              props.isCompleted && 'bg-transparent'
            )}
          >
            <Icons.Check
              className={cn('size-24', props.compact && 'size-12')}
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
