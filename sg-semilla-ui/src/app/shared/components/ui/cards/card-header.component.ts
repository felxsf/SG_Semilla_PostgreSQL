import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="headerClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CardHeaderComponent {
  @Input() divider = false;
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  
  get headerClasses(): string {
    const classes = ['card-header', 'transition-colors', 'duration-300'];
    
    // Divider
    if (this.divider) {
      classes.push('border-b', 'border-gray-200', 'mb-3', 'pb-2');
    }
    
    // Padding
    if (this.padding === 'none') {
      classes.push('p-0');
    } else if (this.padding === 'sm') {
      classes.push('px-3', 'py-2');
    } else if (this.padding === 'lg') {
      classes.push('px-6', 'py-4');
    } else {
      classes.push('px-4', 'py-3');
    }
    
    // Añadir clases para mejorar la apariencia
    classes.push('font-medium', 'text-gray-800');
    
    return classes.join(' ');
  }
}