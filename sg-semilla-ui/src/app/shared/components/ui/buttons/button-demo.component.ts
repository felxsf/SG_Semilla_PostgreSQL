import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="p-4 space-y-6">
      <h2 class="text-xl font-bold mb-4">Variantes de Botones</h2>
      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Botones Primarios</h3>
        <div class="flex flex-wrap gap-4">
          <app-button variant="primary" size="sm">Pequeño</app-button>
          <app-button variant="primary">Mediano</app-button>
          <app-button variant="primary" size="lg">Grande</app-button>
          <app-button variant="primary" [disabled]="true">Deshabilitado</app-button>
        </div>
      </div>
      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Botones Secundarios</h3>
        <div class="flex flex-wrap gap-4">
          <app-button variant="secondary" size="sm">Pequeño</app-button>
          <app-button variant="secondary">Mediano</app-button>
          <app-button variant="secondary" size="lg">Grande</app-button>
          <app-button variant="secondary" [disabled]="true">Deshabilitado</app-button>
        </div>
      </div>
      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Botones Outline</h3>
        <div class="flex flex-wrap gap-4">
          <app-button variant="outline" size="sm">Pequeño</app-button>
          <app-button variant="outline">Mediano</app-button>
          <app-button variant="outline" size="lg">Grande</app-button>
          <app-button variant="outline" [disabled]="true">Deshabilitado</app-button>
        </div>
      </div>
      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Botones de Texto</h3>
        <div class="flex flex-wrap gap-4">
          <app-button variant="text" size="sm">Pequeño</app-button>
          <app-button variant="text">Mediano</app-button>
          <app-button variant="text" size="lg">Grande</app-button>
          <app-button variant="text" [disabled]="true">Deshabilitado</app-button>
        </div>
      </div>
      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Botones de Ancho Completo</h3>
        <div class="space-y-2">
          <app-button variant="primary" [fullWidth]="true">Primario</app-button>
          <app-button variant="secondary" [fullWidth]="true">Secundario</app-button>
          <app-button variant="outline" [fullWidth]="true">Outline</app-button>
          <app-button variant="text" [fullWidth]="true">Texto</app-button>
        </div>
      </div>
    </div>
  `,
})
export class ButtonDemoComponent {}