import { Component } from '@angular/core';
import {
  ListAdderComponent,
  ListItem,
} from '../../components/list-adder/list-adder.component';

@Component({
  selector: 'app-incomes-page',
  standalone: true,
  imports: [ListAdderComponent],
  templateUrl: './incomes-page.component.html',
  styleUrl: './incomes-page.component.scss',
})
export class IncomesPageComponent {
  defaultIncomesList: ListItem[] = [
    {
      name: 'Sueldo',
      value: 1800.0,
    },
    {
      name: 'Intereses',
      value: 50.0,
    },
    {
      name: 'Inversiones',
      value: 12.5,
    },
  ];
}
