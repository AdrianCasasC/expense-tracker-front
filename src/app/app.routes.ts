import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExpensesPageComponent } from './pages/expenses-page/expenses-page.component';
import { IncomesPageComponent } from './pages/incomes-page/incomes-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'expenses',
    component: ExpensesPageComponent,
  },
  {
    path: 'incomes',
    component: IncomesPageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
