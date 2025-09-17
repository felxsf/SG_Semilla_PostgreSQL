import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn } from './table.component';
import { TablePaginationComponent } from './table-pagination.component';
import { TableFiltersComponent, FilterConfig, FilterValue } from './table-filters.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: Date;
}

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [CommonModule, TableComponent, TablePaginationComponent, TableFiltersComponent],
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent implements OnInit {
  // Datos de ejemplo
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  
  // Configuración de la tabla
  columns: TableColumn[] = [
    { key: 'id', header: 'ID', sortable: true, width: '80px' },
    { key: 'name', header: 'Nombre', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Rol', sortable: true },
    { 
      key: 'status', 
      header: 'Estado', 
      sortable: true,
      cell: (item: User) => {
        return item.status === 'active' ? 'Activo' : 'Inactivo';
      }
    },
    { 
      key: 'lastLogin', 
      header: 'Último acceso', 
      sortable: true,
      cell: (item: User) => {
        return item.lastLogin.toLocaleDateString();
      }
    }
  ];
  
  // Configuración de filtros
  filters: FilterConfig[] = [
    { key: 'name', label: 'Nombre', type: 'text', placeholder: 'Buscar por nombre' },
    { key: 'email', label: 'Email', type: 'text', placeholder: 'Buscar por email' },
    { 
      key: 'role', 
      label: 'Rol', 
      type: 'select',
      options: [
        { value: 'admin', label: 'Administrador' },
        { value: 'user', label: 'Usuario' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Visualizador' }
      ]
    },
    { 
      key: 'status', 
      label: 'Estado', 
      type: 'select',
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
      ]
    }
  ];
  
  // Configuración de paginación
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  
  // Estado de carga
  loading = false;
  
  ngOnInit(): void {
    this.generateMockData();
    this.applyFiltersAndPagination();
  }
  
  generateMockData(): void {
    const roles = ['admin', 'user', 'editor', 'viewer'];
    const statuses: ('active' | 'inactive')[] = ['active', 'inactive'];
    
    this.allUsers = Array.from({ length: 100 }, (_, i) => {
      const id = i + 1;
      return {
        id,
        name: `Usuario ${id}`,
        email: `usuario${id}@example.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      };
    });
    
    this.filteredUsers = [...this.allUsers];
    this.totalItems = this.filteredUsers.length;
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyPagination();
  }
  
  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1; // Reset to first page when changing page size
    this.applyPagination();
  }
  
  onFilterApply(filters: FilterValue[]): void {
    this.loading = true;
    
    // Simular tiempo de carga
    setTimeout(() => {
      this.applyFilters(filters);
      this.loading = false;
    }, 500);
  }
  
  onFilterClear(): void {
    this.loading = true;
    
    // Simular tiempo de carga
    setTimeout(() => {
      this.filteredUsers = [...this.allUsers];
      this.totalItems = this.filteredUsers.length;
      this.currentPage = 1;
      this.applyPagination();
      this.loading = false;
    }, 500);
  }
  
  onSortChange(event: {column: string, direction: 'asc' | 'desc'}): void {
    this.loading = true;
    
    // Simular tiempo de carga
    setTimeout(() => {
      const { column, direction } = event;
      
      this.filteredUsers.sort((a: any, b: any) => {
        const valueA = a[column];
        const valueB = b[column];
        
        if (valueA instanceof Date && valueB instanceof Date) {
          return direction === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
        }
        
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
        
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      });
      
      this.applyPagination();
      this.loading = false;
    }, 500);
  }
  
  onRowClick(user: User): void {
    console.log('Usuario seleccionado:', user);
    // Aquí se podría abrir un modal con detalles del usuario, navegar a una página de detalles, etc.
  }
  
  private applyFilters(filters: FilterValue[]): void {
    if (filters.length === 0) {
      this.filteredUsers = [...this.allUsers];
    } else {
      this.filteredUsers = this.allUsers.filter(user => {
        return filters.every(filter => {
          const value = user[filter.key as keyof User];
          
          if (typeof filter.value === 'string' && typeof value === 'string') {
            return value.toLowerCase().includes(filter.value.toLowerCase());
          }
          
          return value === filter.value;
        });
      });
    }
    
    this.totalItems = this.filteredUsers.length;
    this.currentPage = 1; // Reset to first page when applying filters
    this.applyPagination();
  }
  
  private applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }
  
  private applyFiltersAndPagination(): void {
    this.filteredUsers = [...this.allUsers];
    this.totalItems = this.filteredUsers.length;
    this.applyPagination();
  }
}