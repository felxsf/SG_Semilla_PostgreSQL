import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Datos del usuario actual
  currentUser: any = null;
  isLoading = true;
  
  // Estadísticas
  stats = {
    usuarios: { total: 0, incremento: 0 },
    tareas: { total: 0, incremento: 0 },
    completadas: { total: 0, porcentaje: 0 }
  };
  
  // Actividades recientes
  actividades: any[] = [];
  
  // Tareas pendientes del usuario
  tareasPendientes: any[] = [];
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  loadDashboardData(): void {
    // En una implementación real, estos datos vendrían de servicios
    // Simulamos una carga de datos
    setTimeout(() => {
      // Obtener usuario actual
      // Usar un valor predeterminado ya que estamos en modo de demostración
      this.currentUser = {
        firstName: 'Usuario',
        lastName: 'Demo',
        email: 'usuario@ejemplo.com',
        role: 'Administrador'
      };
      
      // Estadísticas simuladas
      this.stats = {
        usuarios: { total: 1234, incremento: 12.5 },
        tareas: { total: 567, incremento: 8.3 },
        completadas: { total: 342, porcentaje: 60.3 }
      };
      
      // Actividades recientes simuladas
      this.actividades = [
        { tipo: 'usuario', mensaje: 'Nuevo usuario registrado: María López', fecha: new Date(Date.now() - 1000 * 60 * 30), icono: 'user-plus' },
        { tipo: 'tarea', mensaje: 'Tarea completada: Actualizar documentación', fecha: new Date(Date.now() - 1000 * 60 * 120), icono: 'check-circle' },
        { tipo: 'sistema', mensaje: 'Actualización del sistema completada', fecha: new Date(Date.now() - 1000 * 60 * 60 * 5), icono: 'refresh' },
        { tipo: 'alerta', mensaje: 'Alerta: 3 tareas vencidas', fecha: new Date(Date.now() - 1000 * 60 * 60 * 12), icono: 'alert-triangle' },
        { tipo: 'usuario', mensaje: 'Usuario actualizado: Juan Pérez', fecha: new Date(Date.now() - 1000 * 60 * 60 * 24), icono: 'user' }
      ];
      
      // Tareas pendientes simuladas
      this.tareasPendientes = [
        { id: 1, titulo: 'Completar informe mensual', prioridad: 'alta', fechaLimite: new Date(Date.now() + 1000 * 60 * 60 * 24) },
        { id: 2, titulo: 'Revisar solicitudes pendientes', prioridad: 'media', fechaLimite: new Date(Date.now() + 1000 * 60 * 60 * 48) },
        { id: 3, titulo: 'Actualizar base de datos de usuarios', prioridad: 'baja', fechaLimite: new Date(Date.now() + 1000 * 60 * 60 * 72) }
      ];
      
      this.isLoading = false;
    }, 1000);
  }
  
  // Método para formatear fechas relativas (ej: "hace 5 minutos")
  formatearFechaRelativa(fecha: Date): string {
    const ahora = new Date();
    const diferencia = ahora.getTime() - fecha.getTime();
    
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    
    if (minutos < 60) {
      return `hace ${minutos} minutos`;
    } else if (horas < 24) {
      return `hace ${horas} horas`;
    } else {
      return `hace ${dias} días`;
    }
  }
  
  // Método para obtener clase CSS según prioridad
  getClasePrioridad(prioridad: string): string {
    switch (prioridad.toLowerCase()) {
      case 'alta': return 'prioridad-alta';
      case 'media': return 'prioridad-media';
      case 'baja': return 'prioridad-baja';
      default: return '';
    }
  }
  
  // Método para obtener clase CSS según tipo de actividad
  getClaseActividad(tipo: string): string {
    switch (tipo.toLowerCase()) {
      case 'usuario': return 'actividad-usuario';
      case 'tarea': return 'actividad-tarea';
      case 'sistema': return 'actividad-sistema';
      case 'alerta': return 'actividad-alerta';
      default: return '';
    }
  }
}