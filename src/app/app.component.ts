import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService } from './core/service/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sistema-client';
  constructor(private router: Router, public sidebarService: SidebarService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidebarService.collapse();
      }
    });
  }
}
