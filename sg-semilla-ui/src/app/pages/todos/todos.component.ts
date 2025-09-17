import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
  createdAt: string;
}

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  // Exponer Math para usar en la plantilla
  Math = Math;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';
  priorityFilter: string = 'all';
  isLoading: boolean = true;
  errorMessage: string = '';
  selectedTodo: Todo | null = null;
  isModalOpen: boolean = false;
  modalMode: 'view' | 'edit' | 'create' = 'view';
  todoForm: FormGroup;
  
  // Columnas para la tabla
  columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Título', sortable: true },
    { key: 'status', label: 'Estado', sortable: true },
    { key: 'priority', label: 'Prioridad', sortable: true },
    { key: 'dueDate', label: 'Fecha límite', sortable: true },
    { key: 'assignedTo', label: 'Asignado a', sortable: true },
    { key: 'actions', label: 'Acciones', sortable: false }
  ];
  
  // Configuración de paginación
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  
  // Configuración de ordenamiento
  sortColumn: string = 'dueDate';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required],
      assignedTo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading = true;
    
    // Simulación de carga de datos desde API
    setTimeout(() => {
      // Datos de ejemplo (en una aplicación real, esto vendría de una API)
      this.todos = [
        { id: 1, title: 'Implementar autenticación', description: 'Configurar JWT y roles de usuario', status: 'completed', priority: 'high', dueDate: '2023-05-15', assignedTo: 'Juan Pérez', createdAt: '2023-05-01' },
        { id: 2, title: 'Diseñar interfaz de usuario', description: 'Crear mockups y prototipos', status: 'completed', priority: 'medium', dueDate: '2023-05-20', assignedTo: 'María García', createdAt: '2023-05-05' },
        { id: 3, title: 'Desarrollar API REST', description: 'Implementar endpoints para CRUD', status: 'in_progress', priority: 'high', dueDate: '2023-06-10', assignedTo: 'Carlos Rodríguez', createdAt: '2023-05-10' },
        { id: 4, title: 'Configurar base de datos', description: 'Crear esquemas y migraciones', status: 'completed', priority: 'high', dueDate: '2023-05-12', assignedTo: 'Ana Martínez', createdAt: '2023-05-02' },
        { id: 5, title: 'Implementar validaciones', description: 'Validar formularios y datos de entrada', status: 'in_progress', priority: 'medium', dueDate: '2023-06-05', assignedTo: 'Pedro López', createdAt: '2023-05-15' },
        { id: 6, title: 'Escribir pruebas unitarias', description: 'Cubrir al menos 80% del código', status: 'pending', priority: 'medium', dueDate: '2023-06-20', assignedTo: 'Laura Sánchez', createdAt: '2023-05-18' },
        { id: 7, title: 'Optimizar rendimiento', description: 'Mejorar tiempos de carga y respuesta', status: 'pending', priority: 'low', dueDate: '2023-06-30', assignedTo: 'Javier Fernández', createdAt: '2023-05-20' },
        { id: 8, title: 'Documentar API', description: 'Crear documentación con Swagger', status: 'pending', priority: 'low', dueDate: '2023-07-05', assignedTo: 'Sofía Díaz', createdAt: '2023-05-22' },
        { id: 9, title: 'Implementar notificaciones', description: 'Configurar sistema de notificaciones en tiempo real', status: 'pending', priority: 'medium', dueDate: '2023-07-10', assignedTo: 'Miguel Torres', createdAt: '2023-05-25' },
        { id: 10, title: 'Desplegar en producción', description: 'Configurar CI/CD y despliegue', status: 'pending', priority: 'high', dueDate: '2023-07-15', assignedTo: 'Elena Ramírez', createdAt: '2023-05-28' },
        { id: 11, title: 'Realizar pruebas de integración', description: 'Verificar integración entre componentes', status: 'pending', priority: 'medium', dueDate: '2023-07-20', assignedTo: 'David Moreno', createdAt: '2023-05-30' },
        { id: 12, title: 'Implementar búsqueda avanzada', description: 'Añadir filtros y opciones de búsqueda', status: 'pending', priority: 'low', dueDate: '2023-07-25', assignedTo: 'Carmen Jiménez', createdAt: '2023-06-01' }
      ];
      
      this.totalItems = this.todos.length;
      this.applyFilters();
      this.isLoading = false;
    }, 800);
    
    // En una implementación real, se usaría:
    /*
    this.http.get<Todo[]>('/api/v1/todos').subscribe({
      next: (data) => {
        this.todos = data;
        this.totalItems = this.todos.length;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar tareas: ' + error.message;
        this.isLoading = false;
      }
    });
    */
  }

  applyFilters(): void {
    // Filtrar por término de búsqueda, estado y prioridad
    let filtered = this.todos;
    
    // Filtro por término de búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(term) ||
        todo.description.toLowerCase().includes(term) ||
        todo.assignedTo.toLowerCase().includes(term)
      );
    }
    
    // Filtro por estado
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(todo => todo.status === this.statusFilter);
    }
    
    // Filtro por prioridad
    if (this.priorityFilter !== 'all') {
      filtered = filtered.filter(todo => todo.priority === this.priorityFilter);
    }
    
    // Ordenar
    filtered = this.sortData(filtered);
    
    // Actualizar total
    this.totalItems = filtered.length;
    
    // Paginar
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredTodos = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  sortData(data: Todo[]): Todo[] {
    if (!this.sortColumn) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[this.sortColumn as keyof Todo];
      const bValue = b[this.sortColumn as keyof Todo];
      
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

  onStatusFilterChange(status: string): void {
    this.statusFilter = status;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPriorityFilterChange(priority: string): void {
    this.priorityFilter = priority;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  viewTodo(todo: Todo): void {
    this.selectedTodo = { ...todo };
    this.modalMode = 'view';
    this.isModalOpen = true;
  }

  editTodo(todo: Todo): void {
    this.selectedTodo = { ...todo };
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
      status: todo.status,
      priority: todo.priority,
      dueDate: todo.dueDate,
      assignedTo: todo.assignedTo
    });
    this.modalMode = 'edit';
    this.isModalOpen = true;
  }

  createTodo(): void {
    this.todoForm.reset({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      assignedTo: ''
    });
    this.selectedTodo = {
      id: 0,
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      assignedTo: '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.modalMode = 'create';
    this.isModalOpen = true;
  }

  deleteTodo(todo: Todo): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la tarea "${todo.title}"?`)) {
      // En una implementación real, se enviaría una solicitud DELETE a la API
      this.todos = this.todos.filter(t => t.id !== todo.id);
      this.applyFilters();
    }
  }

  saveTodo(): void {
    if (this.todoForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.todoForm.controls).forEach(key => {
        const control = this.todoForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    const formValues = this.todoForm.value;
    
    if (this.modalMode === 'create') {
      // Simular creación de tarea con ID autogenerado
      const newTodo: Todo = {
        id: Math.max(...this.todos.map(t => t.id)) + 1,
        title: formValues.title,
        description: formValues.description,
        status: formValues.status,
        priority: formValues.priority,
        dueDate: formValues.dueDate,
        assignedTo: formValues.assignedTo,
        createdAt: new Date().toISOString().split('T')[0]
      };
      this.todos.push(newTodo);
    } else if (this.modalMode === 'edit' && this.selectedTodo) {
      // Actualizar tarea existente
      const index = this.todos.findIndex(t => t.id === this.selectedTodo!.id);
      if (index !== -1) {
        this.todos[index] = {
          ...this.selectedTodo,
          title: formValues.title,
          description: formValues.description,
          status: formValues.status,
          priority: formValues.priority,
          dueDate: formValues.dueDate,
          assignedTo: formValues.assignedTo
        };
      }
    }
    
    this.applyFilters();
    this.closeModal();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTodo = null;
    this.todoForm.reset();
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
  
  // Métodos para obtener clases CSS según el estado y prioridad
  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in_progress':
        return 'En progreso';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  }
  
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  getPriorityText(priority: string): string {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return priority;
    }
  }
}