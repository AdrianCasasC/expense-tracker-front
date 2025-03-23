import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ListAdderComponent } from '../../components/list-adder/list-adder.component';
import { NotificationService } from '../../services/notification.service';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';
import { CategoryOption, ListItem } from '../../models/global.models';
import {
  defaultIncomesList,
  incomesDropdownOptions,
} from '../../constants/global.constants';
import { getIncomesByMonth } from '../../mocks/api.mock';
import { IncomesService } from '../../services/incomes.service';

@Component({
  selector: 'app-incomes-page',
  standalone: true,
  imports: [ListAdderComponent, NumberFormatterPipe],
  templateUrl: './incomes-page.component.html',
  styleUrl: './incomes-page.component.scss',
})
export class IncomesPageComponent implements OnInit {
  /* Injections */
  private readonly _incomesService = inject(IncomesService);

  /* Signals */
  incomes = this._incomesService.incomes;

  incomesDropdownOptions = incomesDropdownOptions;

  totalIncomes = computed(() =>
    this.incomes().reduce((acc, item) => acc + item.value, 0)
  );

  ngOnInit(): void {
    this._incomesService.getAllIncomes();
  }

  onAddIncome(income: ListItem): void {
    this._incomesService.postIncome(income);
  }

  onEditIncome(income: ListItem): void {
    this._incomesService.pacthIncome(income.id || '', income);
  }

  onDeleteIncome(incomeId: string): void {
    this._incomesService.deleteIncome(incomeId);
  }
}
