import {
  Component,
  effect,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';
import {
  CategoryOption,
  ExpenseCategory,
  IncomeCategory,
  ItemType,
  ListItem,
} from '../../models/global.models';

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

  /* ViewChild */
  @ViewChild('dropdownInput') dropdownInput!: HTMLInputElement;

  /* Signal Inputs */
  title = input<string>('');
  buttonLabel = input<string>('');
  items = input<ListItem[]>([]);
  type = input.required<ItemType>();
  defaultDropdownOptions = input.required<CategoryOption<ItemType>[]>();

  /* Outputs */
  onAdd = output<ListItem>();
  onDelete = output<string>();
  onEdit = output<ListItem>();

  /* Variables */
  showModal: boolean = false;
  showDropdown: boolean = false;
  categoryLabel: string = '';
  dropdownOptions: CategoryOption<ItemType>[] = [];

  /* Form */
  itemForm = this._fb.group({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    value: new FormControl(0, [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  constructor() {
    effect(() => (this.dropdownOptions = this.defaultDropdownOptions()));
  }

  private getType<T>(value: T): string {
    return typeof value;
  }

  private clearForm(): void {
    this.itemForm.reset();
  }

  private createItem(): void {
    const newItem: ListItem = {
      id: Math.random().toString(36).slice(2, 9),
      showOptions: false,
      name: this.itemForm.get('name')?.value || '',
      value: this.itemForm.get('value')?.value || 0,
      type: this.type(),
      category:
        this.type() === 'expense'
          ? (this.itemForm.get('category')?.value as ExpenseCategory)
          : (this.itemForm.get('category')?.value as IncomeCategory) ||
            'others',
      date: new Date().toISOString(),
    };
    this.onAdd.emit(newItem);
  }

  private editItem(id: string): void {
    // Llamada a API para traer el item por el ID

    const editedItem: ListItem = {
      id,
      showOptions: this.itemForm.get('showOptions')?.value || false,
      name: this.itemForm.get('name')?.value || '',
      value: this.itemForm.get('value')?.value || 0,
      type: this.type(),
      category:
        this.type() === 'expense'
          ? (this.itemForm.get('category')?.value as ExpenseCategory)
          : (this.itemForm.get('category')?.value as IncomeCategory) ||
            'others',
      date: new Date().toISOString(), // Cambiar por la date que tiene el item que viene por ID
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

  onShowDropdown(): void {
    this.showDropdown = true;
  }

  onHideDropdown(): void {
    this.showDropdown = false;
  }

  onFilterOptions(event: any): void {
    const value = event?.target.value.toLowerCase();
    this.dropdownOptions = this.defaultDropdownOptions().filter((option) =>
      option.label.toLowerCase().includes(value)
    );
  }

  onSelectOption(value: string): void {
    const categoryControl = this.itemForm.get('category');
    categoryControl?.setValue(value);
    const labelOption = this.defaultDropdownOptions().find(
      (opt) => opt.value === value
    );
    if (labelOption) {
      this.categoryLabel = labelOption.label;
    }
  }
}
