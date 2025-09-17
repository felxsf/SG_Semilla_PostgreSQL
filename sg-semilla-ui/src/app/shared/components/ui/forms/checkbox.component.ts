import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() id = '';
  @Input() name = '';
  
  @Output() valueChange = new EventEmitter<boolean>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  
  checked = false;
  touched = false;
  focused = false;
  
  onChange: any = () => {};
  onTouched: any = () => {};
  
  writeValue(value: boolean): void {
    this.checked = !!value;
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
  
  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.checked = checked;
    this.onChange(checked);
    this.valueChange.emit(checked);
  }
  
  onCheckboxBlur(event: FocusEvent): void {
    this.touched = true;
    this.focused = false;
    this.onTouched();
    this.blur.emit(event);
  }
  
  onCheckboxFocus(event: FocusEvent): void {
    this.focused = true;
    this.focus.emit(event);
  }
  
  get checkboxClasses(): string {
    const classes = [
      'h-4',
      'w-4',
      'rounded',
      'transition-colors',
      'focus:ring-2',
      'focus:ring-offset-2'
    ];
    
    if (this.disabled) {
      classes.push('bg-gray-100', 'text-gray-400', 'cursor-not-allowed', 'border-gray-300');
    } else if (this.errorText) {
      classes.push('border-red-500', 'text-red-600', 'focus:ring-red-500');
    } else {
      classes.push('border-gray-300', 'text-primary', 'focus:ring-primary');
    }
    
    return classes.join(' ');
  }
  
  get labelClasses(): string {
    const classes = ['ml-2', 'text-sm', 'font-medium'];
    
    if (this.disabled) {
      classes.push('text-gray-500');
    } else if (this.errorText) {
      classes.push('text-red-700');
    } else {
      classes.push('text-gray-700');
    }
    
    return classes.join(' ');
  }
  
  get helperTextClasses(): string {
    const classes = ['text-xs', 'mt-1', 'ml-6'];
    
    if (this.errorText) {
      classes.push('text-red-600');
    } else {
      classes.push('text-gray-500');
    }
    
    return classes.join(' ');
  }
}