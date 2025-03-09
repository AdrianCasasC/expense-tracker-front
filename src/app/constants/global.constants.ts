import { signal } from '@angular/core';
import { ListItem, CategoryOption } from '../models/global.models';

const months = [
  {
    label: 'Enero',
    number: 1,
  },
  {
    label: 'Febrero',
    number: 2,
  },
  {
    label: 'Marzo',
    number: 3,
  },
  {
    label: 'Abril',
    number: 4,
  },
  {
    label: 'Mayo',
    number: 5,
  },
  {
    label: 'Junio',
    number: 6,
  },
  {
    label: 'Julio',
    number: 7,
  },
  {
    label: 'Agosto',
    number: 8,
  },
  {
    label: 'Septiembre',
    number: 9,
  },
  {
    label: 'Octubre',
    number: 10,
  },
  {
    label: 'Noviembre',
    number: 11,
  },
  {
    label: 'Diciembre',
    number: 12,
  },
];

export const getMonthByNumber = (monthNumber: number): string => {
  if (monthNumber < 1 || monthNumber > 12) return '';
  return months.find((month) => month.number === monthNumber)!.label;
};

export const defaultIncomesList = signal<ListItem[]>([
  {
    id: '1',
    showOptions: false,
    name: 'Sueldo',
    value: 1800.0,
    type: 'income',
    category: 'salary',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    showOptions: false,
    name: 'Intereses',
    value: 50.0,
    type: 'income',
    category: 'interests',
    date: new Date().toISOString(),
  },
  {
    id: '3',
    showOptions: false,
    name: 'Inversiones',
    value: 12.5,
    type: 'income',
    category: 'inversions',
    date: new Date().toISOString(),
  },
]);

export const incomeDropdownOptions: CategoryOption<'income'>[] = [
  {
    label: 'Salario',
    value: 'salary',
  },
  {
    label: 'Intereses',
    value: 'interests',
  },
  {
    label: 'Inversiones',
    value: 'inversions',
  },
  {
    label: 'Otros',
    value: 'others',
  },
];

export const defaultExpensesList = signal<ListItem[]>([
  {
    id: '1',
    showOptions: false,
    name: 'Comida',
    value: 0,
    type: 'expense',
    category: 'food',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    showOptions: false,
    name: 'Transporte',
    value: 12,
    type: 'expense',
    category: 'transport',
    date: new Date().toISOString(),
  },
  {
    id: '3',
    showOptions: false,
    name: 'Ropa',
    value: 0,
    type: 'expense',
    category: 'clotes',
    date: new Date().toISOString(),
  },
]);

export const expensesDropdownOptions: CategoryOption<'expense'>[] = [
  {
    label: 'Comida',
    value: 'food',
  },
  {
    label: 'Ocio',
    value: 'leisure',
  },
  {
    label: 'Casa',
    value: 'home',
  },
  {
    label: 'Otros',
    value: 'others',
  },
];
