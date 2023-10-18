import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup; // FormGroup to manage the entire form
  user: any = {}; // This object will hold the form data.

  countries: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // Initialize the form and define validators
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      personalName: [''],
      dob: [''],
      country: ['', Validators.required],
      riskAppetite: ['', Validators.required],
      // balance: [''],
    });
  }

  getUser(): void {
    console.log(this.authService.getUser());
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Handle login logic here
      const email = this.registrationForm.value.email;

      // Verify email first
      this.authService
        .verifyEmail(email)
        .subscribe((verificationStatus: number) => {
          console.log('Email verification result:', verificationStatus);

          if (verificationStatus === 1) {
            // Email is already registered
            this.toastr.error('Email already exists, please login');
            return;
          } else if (verificationStatus === 0) {
            // Email is not registered, proceed with registration
            this.authService.register(this.registrationForm.value).subscribe({
              next: (data) => {
                this.authService.updateUserData(data);
                console.log(data);
                this.router.navigate(['/client-preferences']);
                this.toastr.success('Registered successfully');
              },
              error: (error) => {
                this.toastr.error(error.message);
              },
            });
          }
        });
    } else {
      this.toastr.error(
        'Please fill in the required fields to proceed further!'
      );
    }
  }
}
