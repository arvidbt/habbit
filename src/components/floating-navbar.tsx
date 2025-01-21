import { CreateHabitDrawer } from './create-habit-drawer'
import { Icons } from './icons'
import { Button } from './ui/button'

export function FloatingNavbar() {
  return (
    <div className="fixed bottom-2 max-w-fit space-x-2 rounded-xl border p-2 shadow-md">
      <Button size={'icon'} disabled>
        <Icons.Layers />
      </Button>
      <CreateHabitDrawer />
      <Button size={'icon'} disabled>
        <Icons.Kanban />
      </Button>
    </div>
  )
}
