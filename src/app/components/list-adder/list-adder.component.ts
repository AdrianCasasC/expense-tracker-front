import { Component, input } from '@angular/core';

@Component({
  selector: 'exptr-list-adder',
  standalone: true,
  imports: [],
  templateUrl: './list-adder.component.html',
  styleUrl: './list-adder.component.scss',
})
export class ListAdderComponent {
  /* Signal Inputs */
  title = input<string>('');
  buttonLabel = input<string>('');
  items = input<ListItem[]>([]);

  onAddItem(): void {
    // Abrir modal para introducir item
  }
}

export interface ListItem {
  name: string;
  value: string | number;
}
