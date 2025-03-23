import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ListAdderComponent } from '../../components/list-adder/list-adder.component';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';
import { NotificationService } from '../../services/notification.service';
import { CategoryOption, ListItem } from '../../models/global.models';
import {
  defaultExpensesList,
  expensesDropdownOptions,
} from '../../constants/global.constants';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-expenses-page',
  standalone: true,
  imports: [ListAdderComponent, NumberFormatterPipe],
  templateUrl: './expenses-page.component.html',
  styleUrl: './expenses-page.component.scss',
})
export class ExpensesPageComponent implements OnInit {
  /* Injections */
  private readonly _expensesService = inject(ExpensesService);

  /* Signals */
  expenses = this._expensesService.expenses;

  expensesDropdownOptions = expensesDropdownOptions;

  totalExpenses = computed(() =>
    this.expenses().reduce((acc, item) => acc + item.value, 0)
  );

  ngOnInit(): void {
    this._expensesService.getAllExpenses();
  }

  onAddExpense(expense: ListItem): void {
    this._expensesService.postExpense(expense);
  }

  onEditExpense(expense: ListItem): void {
    this._expensesService.pacthExpense(expense.id || '', expense);
  }

  onDeleteExpense(expenseId: string): void {
    this._expensesService.deleteExpense(expenseId);
  }
}
