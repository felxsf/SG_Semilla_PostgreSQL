import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Seleccionar...';
  @Input() label = '';
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() fullWidth = true;
  @Input() id = '';
  @Input() name = '';
  
  @Output() valueChange = new EventEmitter<string | number>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  
  value: string | number = '';
  touched = false;
  focused = false;
  
  onChange: any = () => {};
  onTouched: any = () => {};
  
  writeValue(value: string | number): void {
    this.value = value !== undefined ? value : '';
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
  
  onSelectBlur(event: FocusEvent): void {
    this.touched = true;
    this.focused = false;
    this.onTouched();
    this.blur.emit(event);
  }
  
  onSelectFocus(event: FocusEvent): void {
    this.focused = true;
    this.focus.emit(event);
  }
  
  get selectClasses(): string {
    const classes = [
      'block',
      'rounded-md',
      'border',
      'focus:outline-none',
      'focus:ring-2',
      'transition-colors',
      'px-3',
      'py-2',
      'appearance-none',
      'bg-white'
    ];
    
    if (this.fullWidth) {
      classes.push('w-full');
    }
    
    if (this.disabled) {
      classes.push('bg-gray-100', 'text-gray-500', 'cursor-not-allowed', 'border-gray-300');
    } else if (this.errorText) {
      classes.push('border-red-500', 'focus:border-red-500', 'focus:ring-red-500', 'text-red-900');
    } else {
      classes.push('border-gray-300', 'focus:border-primary', 'focus:ring-primary', 'text-gray-900');
    }
    
    if (this.focused) {
      classes.push('ring-2');
      
      if (this.errorText) {
        classes.push('ring-red-500');
      } else {
        classes.push('ring-primary');
      }
    }
    
    return classes.join(' ');
  }
  
  get labelClasses(): string {
    const classes = ['block', 'text-sm', 'font-medium', 'mb-1'];
    
    if (this.errorText) {
      classes.push('text-red-700');
    } else {
      classes.push('text-gray-700');
    }
    
    return classes.join(' ');
  }
  
  get helperTextClasses(): string {
    const classes = ['text-xs', 'mt-1'];
    
    if (this.errorText) {
      classes.push('text-red-600');
    } else {
      classes.push('text-gray-500');
    }
    
    return classes.join(' ');
  }
}