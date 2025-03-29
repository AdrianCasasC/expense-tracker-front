import { computed, inject, Injectable, signal } from '@angular/core';
import { RequestService } from './request.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ListItem } from '../models/global.models';
import { map } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class IncomesService extends RequestService<ListItem> {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);

  /* Signals */
  private readonly _incomes = signal<ListItem[]>([]);
  incomes = computed(() => this._incomes());

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/incomes`);
  }

  getAllIncomes(): void {
    this.getAll()
      .pipe(
        map((incomes: ListItem[]) =>
          incomes.map((income) => ({
            ...income,
            date: new Date(income.date),
            showOptions: false,
          }))
        )
      )
      .subscribe({
        next: (resp) => this._incomes.set(resp || []),
        error: () => {
          this._incomes.set([]);
          console.error('Error obtaining incomes');
        },
      });
  }

  postIncome(income: ListItem): void {
    this.create(income).subscribe({
      next: () => {
        this._notificationService.createNotification({
          type: 'success',
          message: '¡Nuevo ingreso añadido!',
        });
        this.getAllIncomes();
      },
      error: () => console.error('Error creating income'),
    });
  }

  pacthIncome(incomeId: string, income: ListItem): void {
    this.patch(incomeId, income).subscribe({
      next: () => {
        this._notificationService.createNotification({
          type: 'success',
          message: 'Ingreso editado correctamente!',
        });
        this.getAllIncomes();
      },
      error: () => console.error('Error updating income'),
    });
  }

  deleteIncome(incomeId: string): void {
    this.delete(incomeId).subscribe({
      next: () => {
        this._notificationService.createNotification({
          type: 'success',
          message: '¡Ingreso eliminado!',
        });
        this.getAllIncomes();
      },
      error: () => console.error('Error updating income'),
    });
  }
}
