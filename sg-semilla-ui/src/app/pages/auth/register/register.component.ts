import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs/operators';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  roleId: number;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      form.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const registerRequest: RegisterRequest = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roleId: 2 // Rol de usuario por defecto
    };

    // Aquí se debe implementar el método register en el AuthService
    // Por ahora, simulamos la llamada al servicio
    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/login']);
    }, 1500);

    // Cuando se implemente el servicio, se usaría así:
    /*
    this.authService.register(registerRequest)
      .pipe(
        finalize(() => this.isSubmitting = false)
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Error al registrar usuario. Por favor, inténtalo de nuevo.';
        }
      });
    */
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}