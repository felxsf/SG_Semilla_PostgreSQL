import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'text' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel: string | null = null;
  
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }

  get buttonClasses(): string {
    const classes = [
      'rounded-md',
      'font-medium',
      'transition-colors',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
    ];

    // Tamaño
    if (this.size === 'sm') {
      classes.push('px-3', 'py-1.5', 'text-sm');
    } else if (this.size === 'lg') {
      classes.push('px-6', 'py-3', 'text-lg');
    } else {
      classes.push('px-4', 'py-2', 'text-base');
    }

    // Ancho completo
    if (this.fullWidth) {
      classes.push('w-full');
    }

    // Variante
    if (this.variant === 'primary') {
      classes.push(
        'bg-primary',
        'text-white',
        'hover:bg-primary-h',
        'focus:ring-primary',
        'active:bg-primary-a'
      );
    } else if (this.variant === 'secondary') {
      classes.push(
        'bg-gold-medium',
        'text-white',
        'hover:bg-gold-dark',
        'focus:ring-gold-medium',
        'active:bg-gold-dark'
      );
    } else if (this.variant === 'outline') {
      classes.push(
        'bg-transparent',
        'text-primary',
        'border',
        'border-primary',
        'hover:bg-primary-h',
        'hover:text-white',
        'focus:ring-primary'
      );
    } else if (this.variant === 'text') {
      classes.push(
        'bg-transparent',
        'text-primary',
        'hover:text-primary-h',
        'focus:ring-primary',
        'px-2',
        'py-1'
      );
    }

    // Deshabilitado
    if (this.disabled) {
      classes.push('opacity-50', 'cursor-not-allowed');
    }

    return classes.join(' ');
  }
}