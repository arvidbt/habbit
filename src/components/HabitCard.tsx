'use client'
import type { Habit } from '@/types/habit'
import { Check, Ellipsis } from 'lucide-react'
import { type AnimationSequence, motion, stagger, useAnimate } from 'motion/react'
import { useEffect, useState } from 'react'

interface HabitCardProps {
  habit: Habit
}


export function HabitCard({ habit }: HabitCardProps) {
  const [scope, animate] = useAnimate()
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const completedAnimation = () => {
    animate("#backdrop", {
      background: " linear-gradient(61deg, rgba(0,18,36,0.8393951330532212) 0%, rgba(17,185,35,1) 35%, rgba(0,255,186,1) 100%)",
      opacity: 1,
      height: "175%",
      aspectRatio: 1 / 1,
    }, { duration: 0.8 })

    animate("#check-button", { background: "rgba(239, 241, 245, 0)" }, { duration: 0.4 })

    const buttonSequence = [
      ["#check-button", { scale: 0.5 }, { duration: 0.9 }],
      ["#check-button", { scale: 2.5 }, { duration: 0.3 }],
      ["#check-button", { scale: 2 }, { duration: 0.2 }],
    ] as AnimationSequence

    animate(buttonSequence)
  }

  const notCompletedAnimation = () => {
    animate("#backdrop", {
      height: "0",
      opacity: 0,
    }, { duration: 0.8 })
    animate("#check-button", { scale: 1, background: "rgba(239, 241, 245, 1)" }, { duration: 0.8 })
  }

  const handleHoldStart = () => {
    completedAnimation()
    setHoldTimeout(setTimeout(() => {
      setIsCompleted(true)
      console.log('habit completed')
    }, 1200))
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
      className='relative h-[90dvh] w-full max-w-[400px]  bg-white rounded-3xl overflow-clip shadow-lg'
    >
      <span id="backdrop" className='h-0 bottom-[23vh] translate-y-1/2 left-1/2 -translate-x-1/2  absolute rounded-full'>
      </span>

      <div id="content"
        className='justify flex inset-0 max-w-md flex-col justify-between absolute items-center px-6 md:px-16 pb-16 shadow-lg'
      >
        <div className="flex flex-col gap-8 mt-2 items-center">
          <button
            onClick={
              () => {
                console.log("open habit editor")
              }
            }
          >
            <Ellipsis className="text-text" />
          </button>
          <div
            id="habit-text-container" className="space-y-4 text-text">
            <motion.p
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.5 }}
              className="font-serif text-4xl font-bold">{habit.habit}</motion.p>
            <motion.p
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.5 }}
              className="text-xl">{habit.when}</motion.p>
            <motion.p
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.5 }}
              className="text-2xl">{habit.why}</motion.p>
          </div>
        </div>

        <motion.button
          disabled={isCompleted}
          id="check-button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          onTapStart={() => !isCompleted && handleHoldStart()}
          onTap={handleHoldEnd}
          onTapCancel={handleHoldEnd}
          className='bg-base rounded-full p-12 text-text'
        >
          <Check className="size-24" />
        </motion.button>
      </div>
    </div>
  )
}
