import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Group, Expense, Member } from "@/types/types";

type Store = {
  groups: Group[];
  addGroup: (group: Group) => void;
  deleteGroup: (groupId: string) => void;
  renameGroup: (groupId: string, newName: string) => void;
  addExpense: (groupId: string, expense: Expense) => void;
  addMember: (groupId: string, member: Member) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      groups: [],
      addGroup: (group) => {
        set({ groups: [...get().groups, group] });
      },
      deleteGroup: (groupId) => {
        set({ groups: get().groups.filter((g) => g.id !== groupId) });
      },
      renameGroup: (groupId, newName) => {
        const updated = get().groups.map((g) =>
          g.id === groupId ? { ...g, name: newName } : g
        );
        set({ groups: updated });
      },
      addExpense: (groupId, expense) => {
        const updated = get().groups.map((g) =>
          g.id === groupId ? { ...g, expenses: [...g.expenses, expense] } : g
        );
        set({ groups: updated });
      },
      addMember: (groupId, member) => {
        const updated = get().groups.map((g) =>
          g.id === groupId ? { ...g, members: [...g.members, member] } : g
        );
        set({ groups: updated });
      },
    }),
    {
      name: "expense-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
