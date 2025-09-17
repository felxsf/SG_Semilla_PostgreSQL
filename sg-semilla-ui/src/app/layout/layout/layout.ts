import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Sidebar, Footer, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {
  showSidebar = true;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      
      // Si no está autenticado y no está en la página de login, redirigir al login
      if (!isAuth && !this.router.url.includes('/login')) {
        this.router.navigate(['/login']);
      }
    });
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
