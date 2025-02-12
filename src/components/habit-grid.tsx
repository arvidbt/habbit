'use client'
import React, { useState } from 'react'
import { HabitCard } from './habit-card'
import { api } from '@/trpc/react'
import { Button } from './ui/button'
import posthog from 'posthog-js'
import { useToast } from '@/hooks/use-toast'
import { LayoutGroup, motion } from 'motion/react'

export const HabitGrid = () => {
  const [compactView, setCompactView] = useState(false)
  const [faultyHabit, setFaultyHabit] = useState(-1)
  const { toast } = useToast()

  const { data: habitsData } = api.habit.getHabitsWithStatus.useQuery()

  const utils = api.useUtils()
  const completeHabit = api.habit.complete.useMutation({
    onSuccess: async () => {
      await utils.habit.getHabitsWithStatus.invalidate()
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

  if (!habitsData) return <p>Click plus button to add habits</p>

  return (
    <div className="grid w-full grid-cols-1 gap-8">
      <Button
        variant="outline"
        onClick={() => setCompactView(!compactView)}
        className="mr-11 place-self-end"
      >
        {compactView ? 'Big view' : 'Compact view'}
      </Button>
      <LayoutGroup>
        <motion.div
          layout
          className="sm:responsive-grid-[23rem] grid w-full items-center gap-6 px-4 md:px-11"
        >
          {habitsData
            .map((data, i) => ({
              ...data,
              originalIndex: i,
            }))
            .sort((a, b) => {
              // Sort by completion status (uncompleted first)
              if (a.isCompleted && !b.isCompleted) return 1
              if (!a.isCompleted && b.isCompleted) return -1
              // If completion status is the same, maintain original order
              return a.originalIndex - b.originalIndex
            })
            .map(({ habit, isCompleted, completions, originalIndex }) => {
              console.log(isCompleted, habit.id)
              if (!habit) {
                return (
                  <p key={originalIndex}>
                    Something went wrong when fetching this habit
                  </p>
                )
              }
              return (
                <motion.div
                  layout
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    layout: { duration: 0.3 },
                    opacity: { duration: 0.5 },
                    y: { duration: 0.5, delay: originalIndex * 0.2 },
                  }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <HabitCard
                    habit={habit}
                    compact={compactView}
                    isCompleted={isCompleted}
                    completions={completions}
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
        </motion.div>
      </LayoutGroup>
    </div>
  )
}
