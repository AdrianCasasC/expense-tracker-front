import {
  Component,
  computed,
  effect,
  Input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { daysInMonth } from '../../utils/helpers';
import { getMonthByNumber } from '../../constants/global.constants';

const sampleIncomes = [
  { day: 1, value: 500 },
  { day: 10, value: 1200 },
  { day: 20, value: 800 },
];

const sampleExpenses = [
  { day: 5, value: 300 },
  { day: 15, value: 450 },
  { day: 25, value: 600 },
];

@Component({
  selector: 'exptr-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements OnInit {
  /* ViewChild */
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  /* Signals */
  selectedYearNumber = signal<number>(new Date().getFullYear());
  selectedMonthNumber = signal<number>(new Date().getMonth() + 1);
  selectedMonthLabel = computed(() =>
    getMonthByNumber(this.selectedMonthNumber())
  );
  daysInSelectedMonth = computed(() =>
    daysInMonth(this.selectedYearNumber(), this.selectedMonthNumber())
  );

  public lineChartData: ChartConfiguration['data'] = {
    labels: [], // Days of the month
    datasets: [
      {
        data: [], // Income data
        label: 'Incomes',
        fill: true, // Enable area fill
        borderColor: 'rgba(0, 128, 0, 1)', // Solid green line
        backgroundColor: 'rgba(0, 128, 0, 0.5)', // Green with 50% opacity
        tension: 0.4, // Smooth curve
        pointRadius: 5,
        pointHoverRadius: 7,
        spanGaps: true, // Ensures the line connects across missing data points
      },
      {
        data: [], // Expense data
        label: 'Expenses',
        fill: true, // Enable area fill
        borderColor: 'rgba(255, 0, 0, 1)', // Solid red line
        backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red with 50% opacity
        tension: 0.4, // Smooth curve
        pointRadius: 5,
        pointHoverRadius: 7,
        spanGaps: true, // Ensures the line connects across missing data points
      },
    ],
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };

  constructor() {
    effect(() => this.updateChartData(sampleIncomes, sampleExpenses));
  }

  updateChartData(
    incomes: { day: number; value: number }[],
    expenses: { day: number; value: number }[]
  ): void {
    const incomesData = new Array(this.daysInSelectedMonth()).fill(null);
    const expensesData = new Array(this.daysInSelectedMonth()).fill(null);

    incomes.forEach((item) => {
      incomesData[item.day - 1] = item.value;
    });

    expenses.forEach((item) => {
      expensesData[item.day - 1] = item.value;
    });

    this.lineChartData.datasets[0].data = incomesData;
    this.lineChartData.datasets[1].data = expensesData;

    this.lineChartData.labels = Array.from(
      { length: this.daysInSelectedMonth() },
      (_, i) => (i + 1).toString()
    );

    this.chart?.update();
  }

  ngOnInit(): void {
    this.updateChartData(sampleIncomes, sampleExpenses);
  }

  onPreviousMonth(): void {
    // Llamada a API para traer datos del mes anterior

    this.selectedMonthNumber.update((prevMonth) => {
      if (prevMonth === 1) {
        this.selectedYearNumber.update((prevYear) => prevYear - 1);
        return 12;
      }
      return prevMonth - 1;
    });
  }

  onNextMonth(): void {
    // Llamada a API para traer datos del mes siguiente

    this.selectedMonthNumber.update((prevMonth) => {
      if (prevMonth === 12) {
        this.selectedYearNumber.update((prevYear) => prevYear + 1);
        return 1;
      }
      return prevMonth + 1;
    });
  }
}
