import { Component, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';

@Component({
  selector: 'exptr-list-adder',
  standalone: true,
  imports: [ReactiveFormsModule, ClickOutsideDirective, NumberFormatterPipe],
  templateUrl: './list-adder.component.html',
  styleUrl: './list-adder.component.scss',
})
export class ListAdderComponent {
  /* Injections */
  private readonly _fb = inject(FormBuilder);

  /* Signal Inputs */
  title = input<string>('');
  buttonLabel = input<string>('');
  items = input<ListItem[]>([]);

  /* Outputs */
  onAdd = output<ListItem>();
  onDelete = output<string>();

  /* Variables */
  showModal: boolean = false;
  showItemOptions: boolean = false;

  /* Form */
  itemForm = this._fb.group({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
  });

  private clearForm(): void {
    this.itemForm.reset();
  }

  onAddItem(): void {
    setTimeout(() => {
      // Para que la directiva no cierre el modal antes de abrirlo
      this.showModal = true;
    });
  }

  onConfirmItem(): void {
    if (this.itemForm.valid) {
      const newItem: ListItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: this.itemForm.get('name')?.value || '',
        value: this.itemForm.get('value')?.value || 0,
      };
      this.onAdd.emit(newItem);
      this.clearForm();
      this.onCloseModal();
    }
  }

  onDeleteItem(itemId: string): void {
    this.onDelete.emit(itemId);
  }

  onEditItem(itemId: string): void {
    // Add modal with current information
  }

  onShowItemOptions(): void {
    this.showItemOptions = true;
  }

  onCloseModal(): void {
    if (this.showModal) {
      this.showModal = false;
    }
  }
}

export interface ListItem {
  id?: string;
  name: string;
  value: string | number;
}
