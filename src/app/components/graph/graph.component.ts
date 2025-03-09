import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'exptr-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements OnInit {
  @Input() incomeData: { date: string; amount: number }[] = [];
  @Input() expenseData: { date: string; amount: number }[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  ngOnInit() {
    this.generateChartData();
  }

  private generateChartData() {
    const allDates = new Set([
      ...this.incomeData.map((d) => d.date),
      ...this.expenseData.map((d) => d.date),
    ]);
    const sortedDates = Array.from(allDates).sort();

    const incomeAmounts = sortedDates.map(
      (date) => this.incomeData.find((d) => d.date === date)?.amount || 0
    );
    const expenseAmounts = sortedDates.map(
      (date) => this.expenseData.find((d) => d.date === date)?.amount || 0
    );

    this.lineChartData = {
      labels: sortedDates,
      datasets: [
        {
          data: incomeAmounts,
          label: 'Income',
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
        },
        {
          data: expenseAmounts,
          label: 'Expenses',
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
        },
      ],
    };
  }
}
