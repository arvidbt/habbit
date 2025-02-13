import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from './ui/button'
import { Icons } from './icons'
import { HabitForm } from './habit-form'

export async function CreateHabitDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={'default'}>
          <Icons.SquarePlus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new Habit</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <HabitForm />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
