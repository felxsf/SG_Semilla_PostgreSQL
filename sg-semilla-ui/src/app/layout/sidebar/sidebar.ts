import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  @Input() collapsed = false;
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  
  expandedSections: {[key: string]: boolean} = {};
  
  toggleSection(sectionLabel: string): void {
    this.expandedSections[sectionLabel] = !this.expandedSections[sectionLabel];
  }
  
  isSectionExpanded(sectionLabel: string): boolean {
    return this.expandedSections[sectionLabel] !== false;
  }
  
  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }
  
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.collapsed) {
      this.toggleSidebarEvent.emit();
    }
  }
  
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.collapsed) {
      this.toggleSidebarEvent.emit();
    }
  }
  
  menuItems = [
    { 
      label: 'Principal', 
      icon: 'home', 
      items: [
        { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' }
      ] 
    },
    { 
      label: 'Componentes UI', 
      icon: 'widgets', 
      items: [
        { label: 'Botones', route: '/button-demo', icon: 'smart_button' },
        { label: 'Tarjetas', route: '/card-demo', icon: 'dashboard_customize' },
        { label: 'Formularios', route: '/form-demo', icon: 'input' },
        { label: 'Gráficas', route: '/chart-demo', icon: 'bar_chart' },
        { label: 'Tablas', route: '/table-demo', icon: 'table_chart' }
      ] 
    },
    { 
      label: 'Administración', 
      icon: 'settings', 
      items: [
        { label: 'Usuarios', route: '/users', icon: 'people' },
        { label: 'Configuración', route: '/settings', icon: 'settings' }
      ] 
    }
  ];
}
