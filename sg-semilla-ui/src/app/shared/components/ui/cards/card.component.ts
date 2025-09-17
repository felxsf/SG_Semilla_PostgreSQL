import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() variant: 'default' | 'outlined' | 'elevated' = 'default';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() fullWidth = false;
  @Input() clickable = false;
  
  get cardClasses(): string {
    const classes = ['card', 'transition-all', 'duration-300'];
    
    // Variante
    if (this.variant === 'default') {
      classes.push('bg-white', 'hover:bg-gray-50');
    } else if (this.variant === 'outlined') {
      classes.push('bg-white', 'border', 'border-gray-200', 'hover:border-primary/50');
    } else if (this.variant === 'elevated') {
      classes.push('bg-white', 'shadow-md', 'hover:shadow-lg');
    }
    
    // Padding
    if (this.padding === 'none') {
      classes.push('p-0');
    } else if (this.padding === 'sm') {
      classes.push('p-3');
    } else if (this.padding === 'lg') {
      classes.push('p-6');
    } else {
      classes.push('p-4');
    }
    
    // Bordes redondeados
    if (this.rounded === 'none') {
      classes.push('rounded-none');
    } else if (this.rounded === 'sm') {
      classes.push('rounded-sm');
    } else if (this.rounded === 'lg') {
      classes.push('rounded-lg');
    } else if (this.rounded === 'full') {
      classes.push('rounded-xl');
    } else {
      classes.push('rounded-md');
    }
    
    // Ancho completo
    if (this.fullWidth) {
      classes.push('w-full');
    }
    
    // Clickable
    if (this.clickable) {
      classes.push(
        'cursor-pointer', 
        'transform', 
        'hover:translate-y-[-2px]', 
        'hover:shadow-lg', 
        'active:shadow-sm', 
        'active:translate-y-0'
      );
    }
    
    return classes.join(' ');
  }
}