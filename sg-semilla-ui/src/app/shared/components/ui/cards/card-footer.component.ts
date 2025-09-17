import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="footerClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CardFooterComponent {
  @Input() divider = false;
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  
  get footerClasses(): string {
    const classes = ['card-footer', 'transition-all', 'duration-300'];
    
    // Divider
    if (this.divider) {
      classes.push('border-t', 'border-gray-200', 'mt-3', 'pt-2');
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
    classes.push('text-gray-600', 'text-sm');
    
    return classes.join(' ');
  }
}