import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isEditing = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  // Datos simulados del usuario
  user = {
    id: 1,
    username: 'usuario_demo',
    email: 'usuario@ejemplo.com',
    firstName: 'Usuario',
    lastName: 'Demo',
    role: 'Administrador',
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date(),
    avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=0D8ABC&color=fff'
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserProfile();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      username: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  loadUserProfile(): void {
    this.isLoading = true;
    
    // Simulación de carga de datos del usuario
    setTimeout(() => {
      // En una implementación real, aquí se obtendría el perfil del usuario desde el servicio
      // this.authService.getUserProfile().subscribe(user => { ... });
      
      this.profileForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName
      });
      
      this.isLoading = false;
    }, 800);
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    
    if (this.isEditing) {
      this.profileForm.get('firstName')?.enable();
      this.profileForm.get('lastName')?.enable();
    } else {
      this.profileForm.get('firstName')?.disable();
      this.profileForm.get('lastName')?.disable();
      // Restablecer los valores originales si se cancela la edición
      this.profileForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName
      });
      
      // Limpiar campos de contraseña
      this.profileForm.patchValue({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const formData = this.profileForm.value;
    
    // Validar contraseñas si se está intentando cambiar
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        this.errorMessage = 'Debe proporcionar su contraseña actual para cambiarla';
        this.isLoading = false;
        return;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        this.errorMessage = 'La nueva contraseña y la confirmación no coinciden';
        this.isLoading = false;
        return;
      }
    }
    
    // Simulación de actualización de perfil
    setTimeout(() => {
      // En una implementación real, aquí se enviaría la actualización al servicio
      // this.authService.updateProfile(formData).subscribe(response => { ... });
      
      // Actualizar datos simulados
      this.user.firstName = formData.firstName;
      this.user.lastName = formData.lastName;
      
      this.successMessage = 'Perfil actualizado correctamente';
      this.isLoading = false;
      this.toggleEditMode();
      
      // Actualizar el avatar con el nuevo nombre
      this.user.avatar = `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=0D8ABC&color=fff`;
    }, 1000);
  }

  changePassword(): void {
    // Implementación real del cambio de contraseña
    // this.authService.changePassword(this.profileForm.value).subscribe(...);
  }
}