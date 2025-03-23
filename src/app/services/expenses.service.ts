import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ListItem } from '../models/global.models';
import { RequestService } from './request.service';
import { map } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService extends RequestService<ListItem> {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);

  /* Signals */
  private readonly _expenses = signal<ListItem[]>([]);
  expenses = computed(() => this._expenses());

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/expenses`);
  }

  getAllExpenses(): void {
    this.getAll()
      .pipe(
        map((expenses: ListItem[]) =>
          expenses.map((expense) => ({
            ...expense,
            date: new Date(expense.date),
            showOptions: false,
          }))
        )
      )
      .subscribe({
        next: (resp) => this._expenses.set(resp),
        error: () => console.error('Error obtaining expenses'),
      });
  }

  postExpense(expense: ListItem): void {
    this.create(expense).subscribe({
      next: () => {
        this._notificationService.createNotification({
          type: 'success',
          message: '¡Nuevo gasto añadido!',
        });
        this.getAllExpenses();
      },
      error: () => console.error('Error creating expense'),
    });
  }

  pacthExpense(expenseId: string, expense: ListItem): void {
    this.patch(expenseId, expense).subscribe({
      next: () => {
        this._notificationService.createNotification({
          type: 'success',
          message: '¡Gasto editado correctamente!',
        });
        this.getAllExpenses();
      },
      error: () => console.error('Error updating expense'),
    });
  }

  deleteExpense(expenseId: string): void {
    this.delete(expenseId).subscribe({
      next: () => {
        this._notificationService.createNotification({
          type: 'success',
          message: '¡Gasto eliminado!',
        });
        this.getAllExpenses();
      },
      error: () => console.error('Error updating expense'),
    });
  }
}
