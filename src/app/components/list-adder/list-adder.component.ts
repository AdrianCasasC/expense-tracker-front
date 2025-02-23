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
  onEdit = output<ListItem>();

  /* Variables */
  showModal: boolean = false;

  /* Form */
  itemForm = this._fb.group({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    value: new FormControl(0, [Validators.required]),
  });

  private clearForm(): void {
    this.itemForm.reset();
  }

  private createItem(): void {
    const newItem: ListItem = {
      id: Math.random().toString(36).slice(2, 9),
      showOptions: false,
      name: this.itemForm.get('name')?.value || '',
      value: this.itemForm.get('value')?.value || 0,
    };
    this.onAdd.emit(newItem);
  }

  private editItem(id: string): void {
    const editedItem: ListItem = {
      id,
      showOptions: this.itemForm.get('showOptions')?.value || false,
      name: this.itemForm.get('name')?.value || '',
      value: this.itemForm.get('value')?.value || 0,
    };
    this.onEdit.emit(editedItem);
  }

  onOpenModal(): void {
    setTimeout(() => {
      // Para que la directiva no cierre el modal antes de abrirlo
      this.showModal = true;
    });
  }

  onCloseModal(): void {
    if (this.showModal) {
      this.showModal = false;
    }
  }

  onConfirmItem(): void {
    if (this.itemForm.valid) {
      const itemId = this.itemForm.get('id')?.value;
      if (itemId) {
        this.editItem(itemId);
      } else {
        this.createItem();
      }
      this.clearForm();
      this.onCloseModal();
    }
  }

  onDeleteItem(itemId: string): void {
    this.onDelete.emit(itemId);
  }

  onEditItem(itemId: string): void {
    const selectedItem = this.items().find((item) => item.id === itemId);
    this.itemForm.patchValue({
      id: selectedItem?.id,
      name: selectedItem?.name,
      value: selectedItem?.value,
    });
    this.onOpenModal();
  }

  onToggleItemOptions(itemId: string): void {
    this.items().forEach((item) => {
      if (item.id !== itemId) item.showOptions = false;
    });
    const selectedItem = this.items().find((item) => item.id === itemId);
    if (selectedItem) {
      selectedItem.showOptions = !selectedItem.showOptions;
    }
  }
}

export interface ListItem {
  id?: string;
  showOptions: boolean;
  name: string;
  value: number;
}
