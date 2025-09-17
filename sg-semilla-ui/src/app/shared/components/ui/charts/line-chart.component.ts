import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartComponent } from './chart.component';

export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
    tension?: number;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointRadius?: number;
    pointHoverRadius?: number;
  }[];
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() data: LineChartData = { labels: [], datasets: [] };
  @Input() title = '';
  @Input() showLegend = true;
  @Input() legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() width = '100%';
  @Input() height = '400px';
  @Input() curved = false;
  @Input() filled = false;
  
  chartData: ChartData = { datasets: [] };
  chartOptions: ChartOptions = {};
  
  ngOnInit(): void {
    this.prepareChartData();
    this.prepareChartOptions();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['curved'] || changes['filled']) {
      this.prepareChartData();
    }
    
    if (changes['title'] || changes['showLegend'] || changes['legendPosition']) {
      this.prepareChartOptions();
    }
  }
  
  private prepareChartData(): void {
    this.chartData = {
      labels: this.data.labels,
      datasets: this.data.datasets.map((dataset, index) => {
        const color = dataset.borderColor || this.generateColor(index);
        const backgroundColor = dataset.backgroundColor || this.generateBackgroundColor(color);
        
        return {
          ...dataset,
          borderColor: color,
          backgroundColor: backgroundColor,
          fill: dataset.fill !== undefined ? dataset.fill : this.filled,
          tension: dataset.tension !== undefined ? dataset.tension : (this.curved ? 0.4 : 0),
          pointBackgroundColor: dataset.pointBackgroundColor || color,
          pointBorderColor: dataset.pointBorderColor || '#fff',
          pointRadius: dataset.pointRadius || 4,
          pointHoverRadius: dataset.pointHoverRadius || 6
        };
      })
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
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }
  
  private generateColor(index: number): string {
    const colors = [
      'rgb(54, 162, 235)',
      'rgb(255, 99, 132)',
      'rgb(255, 206, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)',
      'rgb(199, 199, 199)'
    ];
    
    return colors[index % colors.length];
  }
  
  private generateBackgroundColor(color: string): string {
    // Convertir el color RGB a RGBA con transparencia
    return color.replace('rgb', 'rgba').replace(')', ', 0.2)');
  }
}