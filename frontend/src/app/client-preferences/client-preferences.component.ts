import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserPreference } from '../models/UserPreferences';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-preferences',
  templateUrl: './client-preferences.component.html',
  styleUrls: ['./client-preferences.component.css'],
})
export class ClientPreferencesComponent implements OnInit {
  // FormGroup manages the entire form
  userPreferenceForm!: FormGroup;

  // Created objects to hold user data
  userpreference = new UserPreference(-1, '', '', '', '', false, true);
  user = new User(-1, '', '', '', '', '', this.userpreference);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.user = this.authService.getUser();

    this.userPreferenceForm = this.formBuilder.group({
      investmentPurpose: ['', Validators.required],
      riskTolerance: ['', Validators.required],
      incomeCategory: ['', Validators.required],
      lengthOfInvestment: ['', Validators.required],
      acceptedRoboAdvisor: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.userPreferenceForm = this.formBuilder.group({
      investmentPurpose: [this.user.preferences.investmentPurpose, Validators.required],
      riskTolerance: [this.user.preferences.riskTolerance, Validators.required],
      incomeCategory: [
        this.user.preferences.incomeCategory,
        Validators.required,
      ],
      lengthOfInvestment: [
        this.user.preferences.lengthOfInvestment,
        Validators.required,
      ],
      acceptedRoboAdvisor: [
        this.user.preferences.acceptedRoboAdvisor,
        Validators.pattern('true'),
      ],
    });
  }

//   changeValueFromBooleanToInt(boolean value): int {
//     if(value == true)
//       return 1;
//     else
//       return 0;
//   }

  // Checking if user is logged in
  isLoggedIn(): boolean {
    // add checks if valid user or not. Currently the check is if some user present or not. This is always true - because a dummy User object is always getting created in authService (is this a good practice?). Suggest checking for user id, if -1 or not.
//     if (this.authService.verifyUser(this.user) != null)
    if(this.user.id != -1) {
      // Updated the if condition
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if(this.isLoggedIn()) {
      if (this.userPreferenceForm.valid) {
        // The form is valid, process the data
        const formData = this.userPreferenceForm.value;
        console.log(this.user)
        console.log(this.user.id);
        console.log(this.user.preferences)
        if(this.user.preferences.isEmpty == true) {
          this.authService
          .addUserPreference({preferences: formData})
          .subscribe((data) => {
          console.log(data);
          this.router.navigate(['/dashboard']);
          this.toastr.success('Registered successfully');
          });
        }
        else {
          this.authService
          .updateUserPreference({ preferences: formData })// Save the data to the mock backend
          .subscribe((data) => {
                  console.log(data);
                  this.router.navigate(['/dashboard']);
                  this.toastr.success('Updated successfully');
                  });
        }
        console.log('Form Submitted');
      } else {
        // Mark all form controls as touched to display validation errors
        this.toastr.error('Please fill all the required fields');
        this.userPreferenceForm.markAllAsTouched();
      }
    }
    else {
      this.toastr.error("Please Register/Log In!");
    }
  }
}
