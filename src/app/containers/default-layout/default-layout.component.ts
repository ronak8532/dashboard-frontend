import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.loggedInUser();
  }

  loggedInUser() {
    let token = localStorage.getItem('token');
    if(!token) {
      this.router.navigate(['/']);
    }
  }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
