import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent {
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @Input() showPageSizeOptions = true;
  @Input() showFirstLastButtons = true;
  @Input() disabled = false;
  
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  
  // Exponer el objeto Math para usarlo en la plantilla
  Math = Math;
  
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  
  get pages(): number[] {
    const visiblePages = 5;
    const pages: number[] = [];
    
    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + visiblePages - 1);
    
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
  
  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
  
  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
  
  onPageChange(page: number): void {
    if (page === this.currentPage || page < 1 || page > this.totalPages || this.disabled) {
      return;
    }
    
    this.pageChange.emit(page);
  }
  
  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const pageSize = parseInt(select.value, 10);
    
    if (pageSize !== this.pageSize && !this.disabled) {
      this.pageSizeChange.emit(pageSize);
    }
  }
}