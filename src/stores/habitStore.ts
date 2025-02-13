import { create } from 'zustand'

interface HabitStoreState {
  compactMode: boolean
  actions: {
    toggleCompactMode: () => void
  }
}

const useHabitStore = create<HabitStoreState>()((set) => ({
  compactMode: false,
  // ⬇️ separate "namespace" for actions
  actions: {
    toggleCompactMode: () =>
      set((state) => ({ compactMode: !state.compactMode })),
  },
}))

export const useCompactMode = (): boolean =>
  useHabitStore((state) => state.compactMode)

// 🎉 one selector for all our actions
export const useHabitActions = (): HabitStoreState['actions'] =>
  useHabitStore((state) => state.actions)
