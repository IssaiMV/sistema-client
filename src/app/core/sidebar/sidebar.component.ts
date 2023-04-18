import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(
    public authService: AuthService,
    private sidebarService: SidebarService
  ) { }

  logout() {
    this.authService.clearToken();
  }

  toggle() {
    this.sidebarService.toggle();
  }
}
