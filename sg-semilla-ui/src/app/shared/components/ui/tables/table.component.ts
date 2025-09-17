import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  cell?: (item: any) => string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() loading = false;
  @Input() striped = true;
  @Input() hoverable = true;
  @Input() bordered = false;
  @Input() compact = false;
  @Input() sortable = true;
  
  @Output() rowClick = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>(); 
  
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  
  get tableClasses(): string {
    const classes = ['min-w-full', 'divide-y', 'divide-gray-200', 'table-auto'];
    
    if (this.bordered) {
      classes.push('border', 'border-gray-200');
    }
    
    return classes.join(' ');
  }
  
  get headerClasses(): string {
    const classes = ['bg-gray-50', 'text-left', 'text-xs', 'font-medium', 'text-gray-500', 'uppercase', 'tracking-wider'];
    
    if (this.compact) {
      classes.push('px-3', 'py-2');
    } else {
      classes.push('px-6', 'py-3');
    }
    
    return classes.join(' ');
  }
  
  get cellClasses(): string {
    const classes = ['text-sm', 'text-gray-900', 'whitespace-nowrap'];
    
    if (this.compact) {
      classes.push('px-3', 'py-2');
    } else {
      classes.push('px-6', 'py-4');
    }
    
    return classes.join(' ');
  }
  
  get rowClasses(): string {
    const classes = [];
    
    if (this.striped) {
      classes.push('even:bg-gray-50');
    }
    
    if (this.hoverable) {
      classes.push('hover:bg-gray-100');
    }
    
    if (this.bordered) {
      classes.push('border-b', 'border-gray-200');
    }
    
    return classes.join(' ');
  }
  
  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }
  
  onSort(column: TableColumn): void {
    if (!column.sortable && !this.sortable) return;
    
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.sortChange.emit({ column: this.sortColumn, direction: this.sortDirection });
  }
  
  getCellValue(item: any, column: TableColumn): string {
    if (column.cell) {
      return column.cell(item);
    }
    
    return item[column.key];
  }
}