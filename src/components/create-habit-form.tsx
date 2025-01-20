'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'

import { CustomInput } from './habit-input'
import posthog from 'posthog-js'
import { api } from '@/trpc/react'

const formSchema = z.object({
  what: z.string().min(1, 'This field is required'),
  when: z.string().min(1, 'This field is required'),
  why: z.string().min(1, 'This field is required'),
})

export function CreateHabitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

    const utils = api.useUtils()
    const createHabit = api.habit.create.useMutation({
        onSuccess: async () => {
            await utils.habit.invalidate()
            setIsSubmitting(false)
        },
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            what: '',
            when: '',
            why: '',
        },
    })

    setIsSubmitting(false)
  }

        console.log(values)
        createHabit.mutate(values)
        toast({
            title: 'Habit created',
            description: `You will ${values.what} ${values.when} so that you can ${values.why}.`,
        })
    }

              <FormField
                control={form.control}
                name="why"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <CustomInput
                        className="w-full"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <CardFooter className="px-0">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <>Creating Habit...</> : 'Create Habit'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
