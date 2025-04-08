import { Group } from "@/../../types/types";

export const calculateBalance = (group: Group) => {
  const balances: Record<string, number> = {};

  group.members.forEach((member) => {
    balances[member.id] = 0;
  });

  group.expenses.forEach((expense) => {
    const share = expense.amount / expense.splitBetween.length;

    expense.splitBetween.forEach((memberId) => {
      if (memberId !== expense.paidBy) {
        balances[memberId] -= share;
        balances[expense.paidBy] += share;
      }
    });
  });

  return balances;
};