'use client'
import React, { useState } from 'react'
import { HabitCard } from './habit-card'
import { api } from '@/trpc/react'
import { motion } from 'motion/react'
import { Button } from './ui/button'
import posthog from 'posthog-js'
import { useToast } from '@/hooks/use-toast'

export const HabitGrid = () => {
  const [compactView, setCompactView] = useState(false)
  const [faultyHabit, setFaultyHabit] = useState(-1)
  const { toast } = useToast()

  const habits = api.habit.getHabits.useQuery().data
  const habitIds = habits?.map((h) => h.id) ?? []

  const completionStatus = api.habit.getBatchCompletionStatus.useQuery(
    { habitIds },
    { enabled: !!habits?.length }
  )
  const completionCounts = api.habit.getBatchCompletionCounts.useQuery(
    { habitIds },
    { enabled: !!habits?.length }
  )

  const utils = api.useUtils()
  const completeHabit = api.habit.complete.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.habit.getBatchCompletionCounts.invalidate(),
        utils.habit.getBatchCompletionStatus.invalidate(),
      ])
    },
    onError(_, variables) {
      setFaultyHabit(variables.habitId)

      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: `Try reloading the app and try again`,
      })
    },
  })

  const handleComplete = (habitId: number) => {
    posthog.capture('habit-completed', { id: habitId })
    completeHabit.mutate({ habitId })
  }

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
              <HabitCard
                habit={habit}
                compact={compactView}
                isCompleted={completionStatus.data?.[i] ?? false}
                completions={completionCounts.data?.[i] ?? 0}
                onComplete={handleComplete}
                reset={() => {
                  if (faultyHabit === habit.id) {
                    setFaultyHabit(-1)
                    return true
                  }
                  return false
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
