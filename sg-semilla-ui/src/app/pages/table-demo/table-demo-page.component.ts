import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn } from '../../shared/components/ui/tables/table.component';
import { TablePaginationComponent } from '../../shared/components/ui/tables/table-pagination.component';
import { TableFiltersComponent, FilterConfig, FilterValue } from '../../shared/components/ui/tables/table-filters.component';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'low_stock' | 'out_of_stock';
  lastUpdated: Date;
}

@Component({
  selector: 'app-table-demo-page',
  standalone: true,
  imports: [CommonModule, TableComponent, TablePaginationComponent, TableFiltersComponent],
  templateUrl: './table-demo-page.component.html',
  styleUrls: ['./table-demo-page.component.scss']
})
export class TableDemoPageComponent implements OnInit {
  // Datos de ejemplo
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];
  
  // Configuración de la tabla
  columns: TableColumn[] = [
    { key: 'id', header: 'ID', sortable: true, width: '80px' },
    { key: 'name', header: 'Nombre', sortable: true },
    { key: 'category', header: 'Categoría', sortable: true },
    { key: 'price', header: 'Precio', sortable: true,
      cell: (item: Product) => {
        return `$${item.price.toFixed(2)}`;
      }
    },
    { key: 'stock', header: 'Stock', sortable: true },
    { 
      key: 'status', 
      header: 'Estado', 
      sortable: true,
      cell: (item: Product) => {
        switch(item.status) {
          case 'available': return 'Disponible';
          case 'low_stock': return 'Stock bajo';
          case 'out_of_stock': return 'Agotado';
          default: return '';
        }
      }
    },
    { 
      key: 'lastUpdated', 
      header: 'Última actualización', 
      sortable: true,
      cell: (item: Product) => {
        return item.lastUpdated.toLocaleDateString();
      }
    }
  ];
  
  // Configuración de filtros
  filters: FilterConfig[] = [
    { key: 'name', label: 'Nombre', type: 'text', placeholder: 'Buscar por nombre' },
    { 
      key: 'category', 
      label: 'Categoría', 
      type: 'select',
      options: [
        { value: 'electronics', label: 'Electrónica' },
        { value: 'clothing', label: 'Ropa' },
        { value: 'home', label: 'Hogar' },
        { value: 'books', label: 'Libros' },
        { value: 'sports', label: 'Deportes' }
      ]
    },
    { 
      key: 'status', 
      label: 'Estado', 
      type: 'select',
      options: [
        { value: 'available', label: 'Disponible' },
        { value: 'low_stock', label: 'Stock bajo' },
        { value: 'out_of_stock', label: 'Agotado' }
      ]
    },
    { 
      key: 'price', 
      label: 'Precio máximo', 
      type: 'number',
      placeholder: 'Precio máximo'
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
    const categories = ['electronics', 'clothing', 'home', 'books', 'sports'];
    const statuses: ('available' | 'low_stock' | 'out_of_stock')[] = ['available', 'low_stock', 'out_of_stock'];
    
    this.allProducts = Array.from({ length: 100 }, (_, i) => {
      const id = i + 1;
      return {
        id,
        name: `Producto ${id}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
        stock: Math.floor(Math.random() * 100),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      };
    });
    
    this.filteredProducts = [...this.allProducts];
    this.totalItems = this.filteredProducts.length;
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
      this.filteredProducts = [...this.allProducts];
      this.totalItems = this.filteredProducts.length;
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
      
      this.filteredProducts.sort((a: any, b: any) => {
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
  
  onRowClick(product: Product): void {
    console.log('Producto seleccionado:', product);
    // Aquí se podría abrir un modal con detalles del producto, navegar a una página de detalles, etc.
  }
  
  private applyFilters(filters: FilterValue[]): void {
    if (filters.length === 0) {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(product => {
        return filters.every(filter => {
          const value = product[filter.key as keyof Product];
          
          if (filter.key === 'name' && typeof filter.value === 'string' && typeof value === 'string') {
            return value.toLowerCase().includes(filter.value.toLowerCase());
          }
          
          if (filter.key === 'price' && typeof filter.value === 'string' && typeof value === 'number') {
            const maxPrice = parseFloat(filter.value);
            return !isNaN(maxPrice) ? value <= maxPrice : true;
          }
          
          return value === filter.value;
        });
      });
    }
    
    this.totalItems = this.filteredProducts.length;
    this.currentPage = 1; // Reset to first page when applying filters
    this.applyPagination();
  }
  
  private applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
  
  private applyFiltersAndPagination(): void {
    this.filteredProducts = [...this.allProducts];
    this.totalItems = this.filteredProducts.length;
    this.applyPagination();
  }
}