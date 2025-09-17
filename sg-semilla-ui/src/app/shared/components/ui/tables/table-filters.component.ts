import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: { value: any; label: string }[];
  placeholder?: string;
}

export interface FilterValue {
  key: string;
  value: any;
}

@Component({
  selector: 'app-table-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss']
})
export class TableFiltersComponent {
  @Input() filters: FilterConfig[] = [];
  @Input() showClearButton = true;
  @Input() showApplyButton = true;
  @Input() autoApply = false;
  @Input() collapsed = false;
  
  @Output() filterChange = new EventEmitter<FilterValue[]>();
  @Output() filterApply = new EventEmitter<FilterValue[]>();
  @Output() filterClear = new EventEmitter<void>();
  @Output() collapsedChange = new EventEmitter<boolean>();
  
  filterValues: { [key: string]: any } = {};
  
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
  
  onFilterChange(key: string, value: any): void {
    this.filterValues[key] = value;
    
    const filters: FilterValue[] = Object.keys(this.filterValues)
      .filter(k => this.filterValues[k] !== null && this.filterValues[k] !== undefined && this.filterValues[k] !== '')
      .map(k => ({ key: k, value: this.filterValues[k] }));
    
    this.filterChange.emit(filters);
    
    if (this.autoApply) {
      this.applyFilters();
    }
  }
  
  applyFilters(): void {
    const filters: FilterValue[] = Object.keys(this.filterValues)
      .filter(k => this.filterValues[k] !== null && this.filterValues[k] !== undefined && this.filterValues[k] !== '')
      .map(k => ({ key: k, value: this.filterValues[k] }));
    
    this.filterApply.emit(filters);
  }
  
  clearFilters(): void {
    this.filterValues = {};
    this.filterClear.emit();
    this.filterChange.emit([]);
    this.filterApply.emit([]);
  }
}