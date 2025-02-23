import { Component } from '@angular/core';
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
  defaultExpensesList: ListItem[] = [
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
      value: 0,
    },
    {
      id: '3',
      showOptions: false,
      name: 'Ropa',
      value: 0,
    },
  ];

  onAddExpense(expense: ListItem): void {
    this.defaultExpensesList.push(expense);
  }

  onEditExpense(expense: ListItem): void {
    const index = this.defaultExpensesList.findIndex(
      (item) => item.id === expense.id
    );
    this.defaultExpensesList[index] = expense;
  }

  onDeleteExpense(expenseId: string): void {
    this.defaultExpensesList = this.defaultExpensesList.filter(
      (item) => item.id !== expenseId
    );
  }
}
