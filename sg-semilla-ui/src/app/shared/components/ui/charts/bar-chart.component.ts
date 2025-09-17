import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartComponent } from './chart.component';

export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() data: BarChartData = { labels: [], datasets: [] };
  @Input() horizontal = false;
  @Input() stacked = false;
  @Input() title = '';
  @Input() showLegend = true;
  @Input() legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() width = '100%';
  @Input() height = '400px';
  
  chartData: ChartData = { datasets: [] };
  chartOptions: ChartOptions = {};
  
  ngOnInit(): void {
    this.prepareChartData();
    this.prepareChartOptions();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['horizontal'] || changes['stacked']) {
      this.prepareChartData();
    }
    
    if (changes['title'] || changes['showLegend'] || changes['legendPosition'] || 
        changes['horizontal'] || changes['stacked']) {
      this.prepareChartOptions();
    }
  }
  
  private prepareChartData(): void {
    this.chartData = {
      labels: this.data.labels,
      datasets: this.data.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor || this.generateColors(dataset.data.length),
        borderColor: dataset.borderColor || 'rgba(0, 0, 0, 0.1)',
        borderWidth: dataset.borderWidth || 1
      }))
    };
  }
  
  private prepareChartOptions(): void {
    this.chartOptions = {
      indexAxis: this.horizontal ? 'y' : 'x',
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
      },
      scales: {
        x: {
          stacked: this.stacked
        },
        y: {
          stacked: this.stacked
        }
      }
    };
  }
  
  private generateColors(count: number): string[] {
    const colors = [
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(199, 199, 199, 0.7)'
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
      result.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    
    return result;
  }
}