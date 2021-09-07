import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public loggedIn: boolean = false;
  public user: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedInUser();
  }

  loggedInUser() {
    let token = localStorage.getItem('token');
    if(token) {
      this.user = jwt_decode(token);
      this.loggedIn = true;
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
