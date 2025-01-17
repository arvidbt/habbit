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
import { Separator } from './ui/separator'
import { CustomInput } from './habit-input'

const formSchema = z.object({
    what: z.string(),
    when: z.string(),
    why: z.string(),
})

export function CreateHabitForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            what: '',
            when: '',
            why: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Card className="mx-auto w-full max-w-md bg-base">
            <CardHeader></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <div className="flex w-full items-center space-x-2">
                            <p className="whitespace-nowrap">I will</p>

                            <FormField
                                control={form.control}
                                name="what"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <CustomInput
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex w-full items-center space-x-2">
                            <FormField
                                control={form.control}
                                name="when"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <CustomInput
                                                className=""
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <p className="whitespace-nowrap">so that</p>
                        </div>
                        <div className="flex w-full items-center space-x-2">
                            <p className="whitespace-nowrap">I can</p>

                            <FormField
                                control={form.control}
                                name="why"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <CustomInput
                                                className=""
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
