import {
  defaultExpensesList,
  defaultIncomesList,
} from '../constants/global.constants';
import { ListItem } from '../models/global.models';

export const getIncomesByMonth = (monthNumber: number): ListItem[] =>
  defaultIncomesList().filter(
    (income) => new Date(income.date).getMonth() + 1 === monthNumber
  );

export const getExpensesByMonth = (monthNumber: number): ListItem[] =>
  defaultExpensesList().filter(
    (expense) => new Date(expense.date).getMonth() + 1 === monthNumber
  );
