import { Component, OnInit, ViewChild } from '@angular/core';
import jwt_decode from "jwt-decode";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) { }
  @ViewChild('myModal') public myModal: ModalDirective;

  ngOnInit() {
    let token = localStorage.getItem('token');
    if(token) {
      this.user = jwt_decode(token);
    }

    this.authService.getUser(this.user.user_id).subscribe((res) => {
      if(res) {
        this.user = res.user;
      }
    })
  }

  update() {
    this.authService.update(this.user, this.user._id).subscribe((res) => {
      if(res) {
        this.myModal.hide()
      }
    })
  }

}
