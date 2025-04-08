import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import { Group, Expense } from "@/types/types";

type Store = {
  groups: Group[];
  addGroup: (group: Group) => void;
  addExpense: (groupId: string, expense: Expense) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      groups: [],
      addGroup: (group) => {
        set({ groups: [...get().groups, group] });
      },
      addExpense: (groupId, expense) => {
        const updated = get().groups.map((g) =>
          g.id === groupId ? { ...g, expenses: [...g.expenses, expense] } : g
        );
        set({ groups: updated });
      },
    }),
    {
      name: "expense-store",
      storage: AsyncStorage as any, // <- this avoids the overcomplication
    }
  )
);
