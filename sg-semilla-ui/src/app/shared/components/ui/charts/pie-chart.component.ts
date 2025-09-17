import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartComponent } from './chart.component';

export interface PieChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
    hoverOffset?: number;
  }[];
}

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() data: PieChartData = { labels: [], datasets: [] };
  @Input() title = '';
  @Input() showLegend = true;
  @Input() legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'right';
  @Input() width = '100%';
  @Input() height = '400px';
  @Input() doughnut = false;
  @Input() cutout?: string;
  
  chartData: ChartData = { datasets: [] };
  chartOptions: ChartOptions = {};
  chartType: 'pie' | 'doughnut' = 'pie';
  
  ngOnInit(): void {
    this.chartType = this.doughnut ? 'doughnut' : 'pie';
    this.prepareChartData();
    this.prepareChartOptions();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doughnut'] && !changes['doughnut'].firstChange) {
      this.chartType = this.doughnut ? 'doughnut' : 'pie';
    }
    
    if (changes['data']) {
      this.prepareChartData();
    }
    
    if (changes['title'] || changes['showLegend'] || changes['legendPosition'] || 
        changes['doughnut'] || changes['cutout']) {
      this.prepareChartOptions();
    }
  }
  
  private prepareChartData(): void {
    this.chartData = {
      labels: this.data.labels,
      datasets: this.data.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor || this.generateColors(this.data.labels.length),
        borderColor: dataset.borderColor || Array(this.data.labels.length).fill('#fff'),
        borderWidth: dataset.borderWidth || 2,
        hoverOffset: dataset.hoverOffset || 10
      }))
    };
  }
  
  private prepareChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: this.showLegend,
          position: this.legendPosition,
        },
        title: {
          display: !!this.title,
          text: this.title
        }
      }
    };
    
    // Añadir cutout como parte de la configuración específica del tipo de gráfica
    if (this.doughnut && this.chartType === 'doughnut') {
      (this.chartOptions as any).cutout = this.cutout || '50%';
    }
  }
  
  private generateColors(count: number): string[] {
    const colors = [
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 99, 132, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(199, 199, 199, 0.8)',
      'rgba(83, 102, 255, 0.8)',
      'rgba(40, 159, 64, 0.8)',
      'rgba(210, 199, 199, 0.8)'
    ];
    
    if (count <= colors.length) {
      return colors.slice(0, count);
    }
    
    // Si necesitamos más colores de los predefinidos, generamos colores aleatorios
    const result = [...colors];
    
    for (let i = colors.length; i < count; i++) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      result.push(`rgba(${r}, ${g}, ${b}, 0.8)`);
    }
    
    return result;
  }
}