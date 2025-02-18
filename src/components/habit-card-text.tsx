import { capitalizeFirst, cn } from '@/lib/utils'
import { type Habit } from '@/server/api/routers/habit'
import { useCompactMode } from '@/stores/habitStore'
import { motion } from 'motion/react'
import React from 'react'
type HabitCardTextProps = {
  habit: Habit
}

export const HabitCardText = (props: HabitCardTextProps) => {
  const compactView = useCompactMode()
  return (
    <>
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: [0.2, 0.71, 0.2, 1.01], duration: 0.5 }}
        className={cn(
          'font-serif font-bold',
          compactView ? 'text-3xl' : 'text-4xl'
        )}
      >
        {capitalizeFirst(props.habit.what)}
      </motion.p>
      {!compactView && (
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
            {capitalizeFirst(props.habit.when)}
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
            {capitalizeFirst(props.habit.why)}
          </motion.p>
        </>
      )}
    </>
  )
}
