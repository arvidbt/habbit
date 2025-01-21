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
import { CreateHabitForm } from './create-habit-form'

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
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <CreateHabitForm />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
