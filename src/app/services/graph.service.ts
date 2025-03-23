import { computed, Injectable, signal } from '@angular/core';
import { RequestService } from './request.service';
import { GraphCosts, ListItem } from '../models/global.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GraphService extends RequestService<GraphCosts> {
  private readonly _graphCosts = signal<GraphCosts>({
    expenses: [],
    incomes: [],
  });
  graphCosts = computed(() => this._graphCosts());

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/costs`);
  }

  getCostsByYearAndMonth(year: number, month: number): void {
    this.getById(`${year}/${month}`).subscribe({
      next: (resp: GraphCosts) => this._graphCosts.set(resp),
    });
  }
}
