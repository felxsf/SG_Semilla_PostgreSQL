import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // Exponer Math para usar en la plantilla
  Math = Math;
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';
  selectedUser: User | null = null;
  isModalOpen: boolean = false;
  modalMode: 'view' | 'edit' | 'create' = 'view';
  
  // Columnas para la tabla
  columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'username', label: 'Usuario', sortable: true },
    { key: 'email', label: 'Correo', sortable: true },
    { key: 'role', label: 'Rol', sortable: true },
    { key: 'status', label: 'Estado', sortable: true },
    { key: 'createdAt', label: 'Fecha de creación', sortable: true },
    { key: 'actions', label: 'Acciones', sortable: false }
  ];
  
  // Configuración de paginación
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  
  // Configuración de ordenamiento
  sortColumn: string = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    
    // Simulación de carga de datos desde API
    setTimeout(() => {
      // Datos de ejemplo (en una aplicación real, esto vendría de una API)
      this.users = [
        { id: 1, username: 'admin', email: 'admin@example.com', role: 'Administrador', status: 'active', createdAt: '2023-01-15' },
        { id: 2, username: 'usuario1', email: 'usuario1@example.com', role: 'Usuario', status: 'active', createdAt: '2023-02-20' },
        { id: 3, username: 'usuario2', email: 'usuario2@example.com', role: 'Usuario', status: 'inactive', createdAt: '2023-03-10' },
        { id: 4, username: 'supervisor', email: 'supervisor@example.com', role: 'Supervisor', status: 'active', createdAt: '2023-04-05' },
        { id: 5, username: 'analista', email: 'analista@example.com', role: 'Analista', status: 'active', createdAt: '2023-05-12' },
        { id: 6, username: 'soporte', email: 'soporte@example.com', role: 'Soporte', status: 'inactive', createdAt: '2023-06-18' },
        { id: 7, username: 'gerente', email: 'gerente@example.com', role: 'Gerente', status: 'active', createdAt: '2023-07-22' },
        { id: 8, username: 'invitado', email: 'invitado@example.com', role: 'Invitado', status: 'active', createdAt: '2023-08-30' },
        { id: 9, username: 'desarrollador', email: 'desarrollador@example.com', role: 'Desarrollador', status: 'active', createdAt: '2023-09-14' },
        { id: 10, username: 'tester', email: 'tester@example.com', role: 'Tester', status: 'inactive', createdAt: '2023-10-05' },
        { id: 11, username: 'diseñador', email: 'disenador@example.com', role: 'Diseñador', status: 'active', createdAt: '2023-11-11' },
        { id: 12, username: 'marketing', email: 'marketing@example.com', role: 'Marketing', status: 'active', createdAt: '2023-12-20' }
      ];
      
      this.totalItems = this.users.length;
      this.applyFilters();
      this.isLoading = false;
    }, 800);
    
    // En una implementación real, se usaría:
    /*
    this.http.get<User[]>('/api/v1/users').subscribe({
      next: (data) => {
        this.users = data;
        this.totalItems = this.users.length;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar usuarios: ' + error.message;
        this.isLoading = false;
      }
    });
    */
  }

  applyFilters(): void {
    // Filtrar por término de búsqueda
    let filtered = this.users;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    }
    
    // Ordenar
    filtered = this.sortData(filtered);
    
    // Actualizar total
    this.totalItems = filtered.length;
    
    // Paginar
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredUsers = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  sortData(data: User[]): User[] {
    if (!this.sortColumn) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[this.sortColumn as keyof User];
      const bValue = b[this.sortColumn as keyof User];
      
      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  viewUser(user: User): void {
    this.selectedUser = { ...user };
    this.modalMode = 'view';
    this.isModalOpen = true;
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.modalMode = 'edit';
    this.isModalOpen = true;
  }

  createUser(): void {
    this.selectedUser = {
      id: 0,
      username: '',
      email: '',
      role: 'Usuario',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.modalMode = 'create';
    this.isModalOpen = true;
  }

  deleteUser(user: User): void {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.username}?`)) {
      // En una implementación real, se enviaría una solicitud DELETE a la API
      this.users = this.users.filter(u => u.id !== user.id);
      this.applyFilters();
    }
  }

  saveUser(): void {
    if (!this.selectedUser) return;
    
    if (this.modalMode === 'create') {
      // Simular creación de usuario con ID autogenerado
      const newUser = {
        ...this.selectedUser,
        id: Math.max(...this.users.map(u => u.id)) + 1
      };
      this.users.push(newUser);
    } else if (this.modalMode === 'edit') {
      // Actualizar usuario existente
      const index = this.users.findIndex(u => u.id === this.selectedUser!.id);
      if (index !== -1) {
        this.users[index] = { ...this.selectedUser };
      }
    }
    
    this.applyFilters();
    this.closeModal();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
  }

  // Métodos para la paginación
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    const totalPages = this.totalPages;
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (this.currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    
    if (this.currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2];
  }
}