import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-body',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="bodyClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CardBodyComponent {
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  
  get bodyClasses(): string {
    const classes = ['card-body', 'transition-all', 'duration-300'];
    
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
    classes.push('text-gray-700', 'leading-relaxed');
    
    return classes.join(' ');
  }
}