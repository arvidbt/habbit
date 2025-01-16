'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
    what: z.string().min(2, {
        message: 'Action must be at least 2 characters.',
    }),
    when: z.string(),
    why: z.string().min(2, {
        message: 'Reason must be at least 2 characters.',
    }),
})

export function CreateHabitForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            what: '',
            when: 'day',
            why: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>Create a New Habit</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="flex items-center space-x-2">
                            <p className="">I want to</p>
                            <FormField
                                control={form.control}
                                name="what"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="w-36 text-black"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <p className="">every</p>
                            <FormField
                                control={form.control}
                                name="when"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-[8rem]">
                                                    <SelectValue placeholder="day" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="day">
                                                        day
                                                    </SelectItem>
                                                    <SelectItem value="week">
                                                        week
                                                    </SelectItem>
                                                    <SelectItem value="month">
                                                        month
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <p>so that</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <p className=""> I can</p>
                            <FormField
                                control={form.control}
                                name="why"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="w-44 text-black"
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <CardFooter className="px-0">
                            <Button type="submit" className="w-full">
                                Create Habit
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
