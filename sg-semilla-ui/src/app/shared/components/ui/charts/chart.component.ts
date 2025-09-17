import { Component, Input, ElementRef, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() type: ChartType = 'bar';
  @Input() data: ChartData = { datasets: [] };
  @Input() options: ChartOptions = {};
  @Input() width = '100%';
  @Input() height = '400px';
  @Input() responsive = true;
  @Input() maintainAspectRatio = true;
  @Input() plugins: any[] = [];
  
  chart: Chart | null = null;
  canvasId = `chart-${Math.random().toString(36).substring(2, 9)}`;
  
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit(): void {
    // Registrar plugins globales si es necesario
  }
  
  ngAfterViewInit(): void {
    this.createChart();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      if (changes['data'] && !changes['data'].firstChange) {
        this.updateChartData();
      }
      
      if (changes['options'] && !changes['options'].firstChange) {
        this.updateChartOptions();
      }
      
      if (changes['type'] && !changes['type'].firstChange) {
        this.destroyChart();
        this.createChart();
      }
    }
  }
  
  private createChart(): void {
    const canvas = this.elementRef.nativeElement.querySelector(`#${this.canvasId}`);
    
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }
    
    const defaultOptions: ChartOptions = {
      responsive: this.responsive,
      maintainAspectRatio: this.maintainAspectRatio,
    };
    
    const chartConfig: ChartConfiguration = {
      type: this.type,
      data: this.data,
      options: { ...defaultOptions, ...this.options },
      plugins: this.plugins
    };
    
    this.chart = new Chart(ctx, chartConfig);
  }
  
  private updateChartData(): void {
    if (!this.chart) return;
    
    this.chart.data = this.data;
    this.chart.update();
  }
  
  private updateChartOptions(): void {
    if (!this.chart) return;
    
    const defaultOptions: ChartOptions = {
      responsive: this.responsive,
      maintainAspectRatio: this.maintainAspectRatio,
    };
    
    this.chart.options = { ...defaultOptions, ...this.options };
    this.chart.update();
  }
  
  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}