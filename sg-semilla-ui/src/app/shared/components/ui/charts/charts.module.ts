import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartComponent } from './chart.component';
import { BarChartComponent } from './bar-chart.component';
import { LineChartComponent } from './line-chart.component';
import { PieChartComponent } from './pie-chart.component';
import { ChartDemoComponent } from './chart-demo.component';

@NgModule({
  imports: [
    CommonModule,
    ChartComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ChartDemoComponent
  ],
  exports: [
    ChartComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ChartDemoComponent
  ]
})
export class ChartsModule { }