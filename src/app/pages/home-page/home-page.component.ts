import { Component, signal } from '@angular/core';
import { GraphComponent } from '../../components/graph/graph.component';
import { ListItem } from '../../models/global.models';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';

@Component({
  selector: 'exptr-home-page',
  standalone: true,
  imports: [GraphComponent, NumberFormatterPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  incomeList = [
    { date: '2024-03-01', amount: 40 },
    { date: '2024-03-02', amount: 80 },
    { date: '2024-03-05', amount: 55 },
    { date: '2024-03-10', amount: 90 },
  ];

  expenseList = [
    { date: '2024-03-01', amount: 60 },
    { date: '2024-03-03', amount: 45 },
    { date: '2024-03-07', amount: 75 },
    { date: '2024-03-10', amount: 50 },
  ];

  lastCosts = signal<ListItem[]>([
    {
      id: '1',
      showOptions: false,
      name: 'Sueldo',
      value: 1800.0,
      type: 'income',
      category: 'salary',
      date: new Date().toISOString(),
    },
    {
      id: '2',
      showOptions: false,
      name: 'Intereses',
      value: 50.0,
      type: 'income',
      category: 'interests',
      date: new Date().toISOString(),
    },
    {
      id: '3',
      showOptions: false,
      name: 'Comida',
      value: 122.5,
      type: 'expense',
      category: 'food',
      date: new Date().toISOString(),
    },
    {
      id: '4',
      showOptions: false,
      name: 'Inversiones',
      value: 12.5,
      type: 'income',
      category: 'inversions',
      date: new Date().toISOString(),
    },
  ]);

  onToggleItemOptions(itemId: string): void {
    this.lastCosts().forEach((item) => {
      if (item.id !== itemId) item.showOptions = false;
    });
    const selectedItem = this.lastCosts().find((item) => item.id === itemId);
    if (selectedItem) {
      selectedItem.showOptions = !selectedItem.showOptions;
    }
  }
}
