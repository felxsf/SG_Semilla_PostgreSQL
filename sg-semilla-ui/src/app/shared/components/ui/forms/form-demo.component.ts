import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent, SelectComponent, CheckboxComponent } from './index';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent, SelectComponent, CheckboxComponent],
  template: `
    <div class="p-4 space-y-6 max-w-3xl mx-auto">
      <h2 class="text-xl font-bold mb-4">Componentes de Formulario</h2>
      
      <!-- Inputs -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Inputs</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Input básico -->
          <app-input
            label="Input básico"
            placeholder="Escribe algo..."
            helperText="Este es un texto de ayuda"
            [(ngModel)]="inputValue"
          ></app-input>
          
          <!-- Input con error -->
          <app-input
            label="Input con error"
            placeholder="Escribe algo..."
            errorText="Este campo es requerido"
            [(ngModel)]="inputErrorValue"
          ></app-input>
          
          <!-- Input de email -->
          <app-input
            type="email"
            label="Email"
            placeholder="correo@ejemplo.com"
            helperText="Ingresa un correo electrónico válido"
            [(ngModel)]="emailValue"
          ></app-input>
          
          <!-- Input de contraseña -->
          <app-input
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            [(ngModel)]="passwordValue"
          ></app-input>
          
          <!-- Input deshabilitado -->
          <app-input
            label="Input deshabilitado"
            placeholder="No puedes editar esto"
            [disabled]="true"
            [(ngModel)]="disabledValue"
          ></app-input>
          
          <!-- Input requerido -->
          <app-input
            label="Input requerido"
            placeholder="Campo obligatorio"
            [required]="true"
            [(ngModel)]="requiredValue"
          ></app-input>
        </div>
      </div>
      
      <!-- Selects -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Selects</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Select básico -->
          <app-select
            label="Select básico"
            [options]="selectOptions"
            helperText="Selecciona una opción"
            [(ngModel)]="selectValue"
          ></app-select>
          
          <!-- Select con error -->
          <app-select
            label="Select con error"
            [options]="selectOptions"
            errorText="Debes seleccionar una opción"
            [(ngModel)]="selectErrorValue"
          ></app-select>
          
          <!-- Select deshabilitado -->
          <app-select
            label="Select deshabilitado"
            [options]="selectOptions"
            [disabled]="true"
            [(ngModel)]="selectDisabledValue"
          ></app-select>
          
          <!-- Select requerido -->
          <app-select
            label="Select requerido"
            [options]="selectOptions"
            [required]="true"
            [(ngModel)]="selectRequiredValue"
          ></app-select>
        </div>
      </div>
      
      <!-- Checkboxes -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Checkboxes</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Checkbox básico -->
          <app-checkbox
            label="Checkbox básico"
            helperText="Marca esta casilla para aceptar"
            [(ngModel)]="checkboxValue"
          ></app-checkbox>
          
          <!-- Checkbox con error -->
          <app-checkbox
            label="Checkbox con error"
            errorText="Debes marcar esta casilla"
            [(ngModel)]="checkboxErrorValue"
          ></app-checkbox>
          
          <!-- Checkbox deshabilitado -->
          <app-checkbox
            label="Checkbox deshabilitado"
            [disabled]="true"
            [(ngModel)]="checkboxDisabledValue"
          ></app-checkbox>
          
          <!-- Checkbox requerido -->
          <app-checkbox
            label="Checkbox requerido"
            [required]="true"
            [(ngModel)]="checkboxRequiredValue"
          ></app-checkbox>
        </div>
      </div>
      
      <!-- Formulario de ejemplo -->
      <div class="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Formulario de ejemplo</h3>
        
        <form class="space-y-4">
          <app-input
            label="Nombre completo"
            placeholder="Ingresa tu nombre completo"
            [required]="true"
            [(ngModel)]="formData.name"
            name="name"
          ></app-input>
          
          <app-input
            type="email"
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            [required]="true"
            [(ngModel)]="formData.email"
            name="email"
          ></app-input>
          
          <app-select
            label="País"
            [options]="countryOptions"
            [required]="true"
            [(ngModel)]="formData.country"
            name="country"
          ></app-select>
          
          <app-checkbox
            label="Acepto los términos y condiciones"
            [required]="true"
            [(ngModel)]="formData.terms"
            name="terms"
          ></app-checkbox>
          
          <div class="flex justify-end mt-6">
            <button 
              type="submit" 
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-h transition-colors"
              [disabled]="!formData.name || !formData.email || !formData.country || !formData.terms"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class FormDemoComponent {
  // Valores para los inputs
  inputValue = '';
  inputErrorValue = '';
  emailValue = '';
  passwordValue = '';
  disabledValue = 'Valor deshabilitado';
  requiredValue = '';
  
  // Valores para los selects
  selectValue = '';
  selectErrorValue = '';
  selectDisabledValue = '1';
  selectRequiredValue = '';
  
  // Opciones para los selects
  selectOptions = [
    { value: '1', label: 'Opción 1' },
    { value: '2', label: 'Opción 2' },
    { value: '3', label: 'Opción 3' },
    { value: '4', label: 'Opción 4', disabled: true }
  ];
  
  // Opciones para el select de países
  countryOptions = [
    { value: 'es', label: 'España' },
    { value: 'mx', label: 'México' },
    { value: 'ar', label: 'Argentina' },
    { value: 'co', label: 'Colombia' },
    { value: 'cl', label: 'Chile' }
  ];
  
  // Valores para los checkboxes
  checkboxValue = false;
  checkboxErrorValue = false;
  checkboxDisabledValue = true;
  checkboxRequiredValue = false;
  
  // Datos del formulario de ejemplo
  formData = {
    name: '',
    email: '',
    country: '',
    terms: false
  };
}