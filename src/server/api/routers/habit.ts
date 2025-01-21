import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { habits } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export const habitRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        what: z.string().min(1),
        why: z.string().min(1),
        when: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(habits).values({
        createdById: ctx.session.user.id,
        what: input.what,
        why: input.why,
        when: input.when,
      })
    }),

  getHabits: protectedProcedure.query(async ({ ctx }) => {
    const fetchedHabits = await ctx.db.query.habits.findMany({
      where: eq(habits.createdById, ctx.session.user.id),
    })
    return fetchedHabits ?? null
  }),
})
