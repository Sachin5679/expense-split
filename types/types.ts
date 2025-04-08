export type Expense = {
    id: string;
    title: string;
    amount: number;
    timestamp: string;
  };
  
  export type Group = {
    id: string;
    name: string;
    members: string[];
    expenses: Expense[];
  };
  