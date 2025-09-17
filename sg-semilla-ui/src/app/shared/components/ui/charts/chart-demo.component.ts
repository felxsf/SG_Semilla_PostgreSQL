import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent, BarChartData } from './bar-chart.component';
import { LineChartComponent, LineChartData } from './line-chart.component';
import { PieChartComponent, PieChartData } from './pie-chart.component';

@Component({
  selector: 'app-chart-demo',
  standalone: true,
  imports: [CommonModule, BarChartComponent, LineChartComponent, PieChartComponent],
  templateUrl: './chart-demo.component.html',
  styleUrls: ['./chart-demo.component.scss']
})
export class ChartDemoComponent {
  // Datos de ejemplo para la gráfica de barras
  barChartData: BarChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas 2023',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      },
      {
        label: 'Ventas 2022',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: 'rgba(255, 99, 132, 0.7)'
      }
    ]
  };
  
  // Datos de ejemplo para la gráfica de líneas
  lineChartData: LineChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Usuarios activos',
        data: [1200, 1900, 3000, 5000, 4000, 6000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Nuevos registros',
        data: [400, 700, 1000, 1700, 1400, 2000],
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.4
      }
    ]
  };
  
  // Datos de ejemplo para la gráfica circular
  pieChartData: PieChartData = {
    labels: ['Rojo', 'Azul', 'Amarillo', 'Verde', 'Morado'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ]
      }
    ]
  };
  
  // Datos de ejemplo para la gráfica de barras horizontales
  horizontalBarChartData: BarChartData = {
    labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
    datasets: [
      {
        label: 'Ventas',
        data: [420, 360, 290, 220, 180],
        backgroundColor: 'rgba(153, 102, 255, 0.7)'
      }
    ]
  };
}