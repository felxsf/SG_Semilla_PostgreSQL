import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent } from './index';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [CommonModule, CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent],
  template: `
    <div class="p-4 space-y-6">
      <h2 class="text-xl font-bold mb-4">Variantes de Tarjetas</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Tarjeta Default -->
        <app-card>
          <app-card-header [divider]="true">
            <h3 class="text-lg font-semibold">Tarjeta Default</h3>
          </app-card-header>
          <app-card-body>
            <p>Esta es una tarjeta con estilo default. Incluye encabezado con divisor, cuerpo y pie.</p>
          </app-card-body>
          <app-card-footer [divider]="true">
            <div class="flex justify-end">
              <button class="text-primary hover:text-primary-h">Acción</button>
            </div>
          </app-card-footer>
        </app-card>
        
        <!-- Tarjeta Outlined -->
        <app-card variant="outlined">
          <app-card-header [divider]="true">
            <h3 class="text-lg font-semibold">Tarjeta Outlined</h3>
          </app-card-header>
          <app-card-body>
            <p>Esta es una tarjeta con borde. Incluye encabezado con divisor, cuerpo y pie.</p>
          </app-card-body>
          <app-card-footer [divider]="true">
            <div class="flex justify-end">
              <button class="text-primary hover:text-primary-h">Acción</button>
            </div>
          </app-card-footer>
        </app-card>
        
        <!-- Tarjeta Elevated -->
        <app-card variant="elevated">
          <app-card-header [divider]="true">
            <h3 class="text-lg font-semibold">Tarjeta Elevated</h3>
          </app-card-header>
          <app-card-body>
            <p>Esta es una tarjeta con sombra. Incluye encabezado con divisor, cuerpo y pie.</p>
          </app-card-body>
          <app-card-footer [divider]="true">
            <div class="flex justify-end">
              <button class="text-primary hover:text-primary-h">Acción</button>
            </div>
          </app-card-footer>
        </app-card>
        
        <!-- Tarjeta Clickable -->
        <app-card variant="elevated" [clickable]="true">
          <app-card-header>
            <h3 class="text-lg font-semibold">Tarjeta Clickable</h3>
          </app-card-header>
          <app-card-body>
            <p>Esta tarjeta es clickable. Prueba a pasar el cursor por encima.</p>
          </app-card-body>
        </app-card>
        
        <!-- Tarjeta con padding pequeño -->
        <app-card padding="sm">
          <app-card-header padding="sm">
            <h3 class="text-lg font-semibold">Padding Pequeño</h3>
          </app-card-header>
          <app-card-body padding="sm">
            <p>Esta tarjeta tiene un padding pequeño en todos sus componentes.</p>
          </app-card-body>
          <app-card-footer padding="sm">
            <div class="flex justify-end">
              <button class="text-primary hover:text-primary-h">Acción</button>
            </div>
          </app-card-footer>
        </app-card>
        
        <!-- Tarjeta con padding grande -->
        <app-card padding="lg">
          <app-card-header padding="lg">
            <h3 class="text-lg font-semibold">Padding Grande</h3>
          </app-card-header>
          <app-card-body padding="lg">
            <p>Esta tarjeta tiene un padding grande en todos sus componentes.</p>
          </app-card-body>
          <app-card-footer padding="lg">
            <div class="flex justify-end">
              <button class="text-primary hover:text-primary-h">Acción</button>
            </div>
          </app-card-footer>
        </app-card>
      </div>
      
      <!-- Tarjeta de ancho completo -->
      <app-card variant="outlined" [fullWidth]="true">
        <app-card-header [divider]="true">
          <h3 class="text-lg font-semibold">Tarjeta de Ancho Completo</h3>
        </app-card-header>
        <app-card-body>
          <p>Esta tarjeta ocupa el ancho completo del contenedor. Es útil para diseños responsive.</p>
        </app-card-body>
        <app-card-footer [divider]="true">
          <div class="flex justify-end space-x-2">
            <button class="text-gray-500 hover:text-gray-700">Cancelar</button>
            <button class="text-primary hover:text-primary-h">Aceptar</button>
          </div>
        </app-card-footer>
      </app-card>
    </div>
  `,
})
export class CardDemoComponent {}