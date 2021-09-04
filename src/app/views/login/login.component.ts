import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }



  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  loginUser() {
    if(this.loginForm && this.loginForm.invalid) {
      return;
    }

    if(this.loginForm && this.loginForm.value) {
      this.authService.authenticateUser(this.loginForm.value).subscribe((res) => {
        if(res && res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['dashboard']);
          this.toastr.success('You are Authorized.');
        } else if(res && res.error_message) {
          this.toastr.error(res.error_message);
        }
      }, function(err) {
         alert(err.message);
      })
    }

  }

}
