export type ExpenseCategory =
  | 'food'
  | 'leisure'
  | 'home'
  | 'transport'
  | 'clotes'
  | 'others';
export type IncomeCategory = 'salary' | 'interests' | 'inversions' | 'others';
export type ItemType = 'expense' | 'income';

export interface ListItem {
  id?: string;
  showOptions: boolean;
  name: string;
  value: number;
  type: ItemType;
  category: ExpenseCategory | IncomeCategory;
  date: Date;
}

interface GraphCost {
  day: number;
  value: number;
}

export interface GraphCosts {
  expenses: GraphCost[];
  incomes: GraphCost[];
}

export interface CategoryOption<T extends ItemType> {
  label: string;
  value: T extends 'expense' ? ExpenseCategory : IncomeCategory;
}
