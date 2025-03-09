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
    { date: '2024-03-01', amount: 500 },
    { date: '2024-03-05', amount: 700 },
  ];

  expenseList = [
    { date: '2024-03-02', amount: 200 },
    { date: '2024-03-06', amount: 150 },
  ];
}
