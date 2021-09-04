import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

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
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
    });
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

}

