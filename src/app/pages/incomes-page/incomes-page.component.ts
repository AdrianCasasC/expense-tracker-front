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
  incomeDropdownOptions,
} from '../../constants/global.constants';
import { getIncomesByMonth } from '../../mocks/api.mock';

@Component({
  selector: 'app-incomes-page',
  standalone: true,
  imports: [ListAdderComponent, NumberFormatterPipe],
  templateUrl: './incomes-page.component.html',
  styleUrl: './incomes-page.component.scss',
})
export class IncomesPageComponent implements OnInit {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);

  defaultIncomesList = signal<ListItem[]>([]);

  incomeDropdownOptions = incomeDropdownOptions;

  totalIncomes = computed(() =>
    this.defaultIncomesList().reduce((acc, item) => acc + item.value, 0)
  );

  private initIcomeList(): void {
    this.defaultIncomesList.set(getIncomesByMonth(new Date().getMonth() + 1));
  }

  constructor() {
    effect(() =>
      console.log('Incomes executed edited: ', this.defaultIncomesList())
    );
  }

  ngOnInit(): void {
    this.initIcomeList();
  }

  onAddIncome(income: ListItem): void {
    this.defaultIncomesList.update((prev) => [...prev, income]);
    this._notificationService.createNotification({
      type: 'success',
      message: '¡Nuevo ingreso añadido!',
    });
  }

  onEditIncome(income: ListItem): void {
    const index = this.defaultIncomesList().findIndex(
      (item) => item.id === income.id
    );
    this.defaultIncomesList.update((prev) =>
      prev.map((item, i) => (i === index ? income : item))
    );
    this._notificationService.createNotification({
      type: 'success',
      message: 'Ingreso editado correctamente!',
    });
  }

  onDeleteIncome(incomeId: string): void {
    this.defaultIncomesList.update((prev) =>
      prev.filter((item) => item.id !== incomeId)
    );
    this._notificationService.createNotification({
      type: 'success',
      message: 'Ingreso eliminado!',
    });
  }
}
