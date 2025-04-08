export type Expense = {
    id: string;
    title: string;
    amount: number;
    timestamp: string;
    paidBy: string;
    splitBetween: string[];
  };
  
  export type Member = {
    id: string;
    name: string;
  };
  
  export type Group = {
    id: string;
    name: string;
    members: Member[];
    expenses: Expense[];
  };
  