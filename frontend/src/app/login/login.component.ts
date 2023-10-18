import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Extract email from the login form
      const email = this.loginForm.value.email;
    
      // Check if the email exists
      this.authService.verifyEmail(email).subscribe((verificationStatus: number) => {
        if (verificationStatus === 0) {
          // Email doesn't exist
          this.toastr.error('Email does not exist');
          return;
        }
    
        // Email exists, proceed with the login
        this.authService.login(email).subscribe({
          next: (data) => {
            this.authService.updateUserData(data);
            this.router.navigate(['/dashboard']);
            this.toastr.success('Logged in successfully');
          },
          error: (error) => {
            this.toastr.error(error.message);
          },
        });
      });
    } else {
      this.toastr.error('Invalid Email');
    }
  }    
}
