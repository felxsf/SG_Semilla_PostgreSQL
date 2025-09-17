import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Layout, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('SG Semilla');
  isLoginRoute = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar la ruta inicial
    this.checkIfLoginRoute(this.router.url);

    // Suscribirse a los cambios de ruta
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkIfLoginRoute(event.urlAfterRedirects);
    });
  }

  private checkIfLoginRoute(url: string): void {
    this.isLoginRoute = url.includes('/login');
  }
}
