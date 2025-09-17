import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  navItems = [
    { label: 'Inicio', route: '/' },
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Reportes', route: '/reports' },
    { label: 'Configuración', route: '/settings' }
  ];

  isAuthenticated = false;
  username = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
