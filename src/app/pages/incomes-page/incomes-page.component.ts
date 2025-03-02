import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  ListAdderComponent,
  ListItem,
} from '../../components/list-adder/list-adder.component';
import { NotificationService } from '../../services/notification.service';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';

@Component({
  selector: 'app-incomes-page',
  standalone: true,
  imports: [ListAdderComponent, NumberFormatterPipe],
  templateUrl: './incomes-page.component.html',
  styleUrl: './incomes-page.component.scss',
})
export class IncomesPageComponent {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);

  defaultIncomesList = signal<ListItem[]>([
    {
      id: '1',
      showOptions: false,
      name: 'Sueldo',
      value: 1800.0,
    },
    {
      id: '2',
      showOptions: false,
      name: 'Intereses',
      value: 50.0,
    },
    {
      id: '3',
      showOptions: false,
      name: 'Inversiones',
      value: 12.5,
    },
  ]);

  totalIncomes = computed(() =>
    this.defaultIncomesList().reduce((acc, item) => acc + item.value, 0)
  );

  constructor() {
    effect(() =>
      console.log('Incomes executed edited: ', this.defaultIncomesList())
    );
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
