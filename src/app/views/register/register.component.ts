import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';


const EMAIL_REGEX = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

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
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ["", [Validators.required]],
      phone: ["", [Validators.required]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    if(this.registerForm.invalid) {
      return;
    }

    this.authService.registerUser(this.registerForm.value).subscribe((res) => {
      if(res) {
        this.toastr.success('Successfully Registered.');
        this.router.navigate(['login']);
      }
    })

  }

  fblogin() {
    this.authService.facebookLogin().subscribe((res) => {
      if(res) {
        console.log(res);
      }
    })
  }

}

