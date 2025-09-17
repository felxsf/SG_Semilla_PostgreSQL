import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// Importar el registro de Chart.js
import './app/shared/components/ui/charts/chart-registry';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
