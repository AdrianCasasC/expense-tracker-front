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
      name: 'Comida',
      value: 0,
    },
    {
      name: 'Transporte',
      value: 0,
    },
    {
      name: 'Ropa',
      value: 0,
    },
  ];
}
