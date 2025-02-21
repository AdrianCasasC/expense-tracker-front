import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'exptr-footer-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer-menu.component.html',
  styleUrl: './footer-menu.component.scss',
})
export class FooterMenuComponent {
  /* Variables */
  menuOptions: MenuOption[] = [
    { label: 'Inicio', value: 'home' },
    { label: 'Gastos', value: 'expenses' },
    { label: 'Ingresos', value: 'incomes' },
  ];
}

interface MenuOption {
  label: string;
  value: string;
}
