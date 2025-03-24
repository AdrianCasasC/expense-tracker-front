import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { GraphComponent } from '../../components/graph/graph.component';
import { ListItem } from '../../models/global.models';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';
import { ExpensesService } from '../../services/expenses.service';
import { IncomesService } from '../../services/incomes.service';

@Component({
  selector: 'exptr-home-page',
  standalone: true,
  imports: [GraphComponent, NumberFormatterPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  /* Injections */
  private readonly _expensesService = inject(ExpensesService);
  private readonly _incomesService = inject(IncomesService);

  /* Signals */
  expenses = this._expensesService.expenses;
  incomes = this._incomesService.incomes;

  lastCosts: ListItem[] = [];

  private initLastCosts(): void {
    const allCosts = [...this.expenses(), ...this.incomes()];
    const sortedCosts = allCosts.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    this.lastCosts = sortedCosts.slice(
      sortedCosts.length - 5,
      sortedCosts.length
    );
  }

  constructor() {
    effect(() => this.initLastCosts());
  }

  ngOnInit(): void {
    this._expensesService.getAllExpenses();
    this._incomesService.getAllIncomes();
  }

  onToggleItemOptions(itemId: string): void {
    this.lastCosts.forEach((item) => {
      if (item.id !== itemId) item.showOptions = false;
    });
    const selectedItem = this.lastCosts.find((item) => item.id === itemId);
    if (selectedItem) {
      selectedItem.showOptions = !selectedItem.showOptions;
    }
  }
}
