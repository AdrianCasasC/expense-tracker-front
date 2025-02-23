import { Component, computed, effect, signal } from '@angular/core';
import {
  ListAdderComponent,
  ListItem,
} from '../../components/list-adder/list-adder.component';

@Component({
  selector: 'app-expenses-page',
  standalone: true,
  imports: [ListAdderComponent],
  templateUrl: './expenses-page.component.html',
  styleUrl: './expenses-page.component.scss',
})
export class ExpensesPageComponent {
  defaultExpensesList = signal<ListItem[]>([
    {
      id: '1',
      showOptions: false,
      name: 'Comida',
      value: 0,
    },
    {
      id: '2',
      showOptions: false,
      name: 'Transporte',
      value: 12,
    },
    {
      id: '3',
      showOptions: false,
      name: 'Ropa',
      value: 0,
    },
  ]);

  totalExpenses = computed(() =>
    this.defaultExpensesList().reduce((acc, item) => acc + item.value, 0)
  );

  constructor() {
    effect(() =>
      console.log('Expenses executed edited: ', this.defaultExpensesList())
    );
  }

  onAddExpense(expense: ListItem): void {
    this.defaultExpensesList.update((prev) => [...prev, expense]);
  }

  onEditExpense(expense: ListItem): void {
    const index = this.defaultExpensesList().findIndex(
      (item) => item.id === expense.id
    );
    this.defaultExpensesList.update((prev) =>
      prev.map((item, i) => (i === index ? expense : item))
    );
  }

  onDeleteExpense(expenseId: string): void {
    this.defaultExpensesList.update((prev) =>
      prev.filter((item) => item.id !== expenseId)
    );
  }
}
