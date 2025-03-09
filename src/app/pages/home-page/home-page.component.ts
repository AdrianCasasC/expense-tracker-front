import { Component } from '@angular/core';
import { GraphComponent } from '../../components/graph/graph.component';

@Component({
  selector: 'exptr-home-page',
  standalone: true,
  imports: [GraphComponent],
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
}
