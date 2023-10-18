import { ComponentFixture, TestBed, flush, tick } from '@angular/core/testing';

import { ClientPreferencesComponent } from './client-preferences.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { UserPreference } from '../models/UserPreferences';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('ClientPreferencesComponent', () => {
  let component: ClientPreferencesComponent;
  let fixture: ComponentFixture<ClientPreferencesComponent>;
  let router: Router;
  let location: Location;
  let formBuilder: FormBuilder;
  let authService: AuthService;

  const mockUser: User[] = [
    {
      id: 1,
      personalName: 'Ish',
      email: 'isha@gmail.com',
      country: 'India',
      dob: '06/07/2001',
      riskAppetite: 'Conservative',
      preferences: new UserPreference(
      1,
        'ddd',
        'AVERAGE',
        '20,001 - 40,000',
        '5-7 years',
        true,
        true
      ),
    },
    {
      id: 2,
      personalName: 'Pranjal',
      email: 'Pranjal@gmail.com',
      country: 'India',
      dob: '07/07/2001',
      riskAppetite: 'Moderate',
      preferences: new UserPreference(2, '', '', '', '', false, true),
    },
    {
      id: 3,
      personalName: 'Shankar',
      email: 'shankar@gmail.com',
      country: 'India',
      dob: '06/08/2001',
      riskAppetite: 'Aggressive',
      preferences: new UserPreference(3, '', '', '', '', false, true),
    },
  ];

  const mockAddedUser = new User(
      1,
      'Ish',
      'isha@gmail.com',
      'India',
      '06/07/2001',
      'Conservative',
      new UserPreference(
      1,
        'old preference purpose',
        'CONSERVATIVE',
        '20,001 - 40,000',
        '5-7 years',
        true,
        true
      )
  );

  const mockUpdatedUser = new User(
    1,
    'Ish',
    'isha@gmail.com',
    'India',
    '06/07/2001',
    'Conservative',
    new UserPreference(
    1,
      'new preference purpose',
      'CONSERVATIVE',
      '20,001 - 40,000',
      '5-7 years',
      true,
      true
    )
  );

  let mockAuthService: any = jasmine.createSpyObj('AuthService', [
    'getUser',
    'retrieveDetails',
    'addUserPreference',
    'updateUserPreference'
  ]);

  mockAuthService.getUser.and.returnValue(mockUser[0]);
  mockAuthService.retrieveDetails.and.returnValue(mockUser[0]);
  mockAuthService.addUserPreference.and.returnValue(mockAddedUser);
  mockAuthService.updateUserPreference.and.returnValue(mockUpdatedUser);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPreferencesComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientPreferencesComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('should submit the user preference form successfully when preferences are empty', () => {
//       const formData = {
//         investmentPurpose: 'Valid Purpose',
//         riskTolerance: 'CONSERVATIVE',
//         incomeCategory: '20,001 - 40,000',
//         lengthOfInvestment: '5-7 year',
//         acceptedRoboAdvisor: true,
//       };
//       component.userPreferenceForm.setValue(formData);
//       component.user = {
//         id: 1,
//         preferences: {
//           isEmpty: true,
//         },
//       };
//       const mockResponse = {
//         investmentPurpose: 'Valid Purpose',
//         riskTolerance: 'CONSERVATIVE',
//         incomeCategory: '20,001 - 40,000',
//         lengthOfInvestment: '5-7 year',
//         acceptedRoboAdvisor: true,
//         };
//       spyOn(authService, 'addUserPreference').and.returnValue(of(mockResponse));
//       spyOn(router, 'navigate')
//       component.onSubmit();
//       expect(authService.addUserPreference).toHaveBeenCalledWith({ preferences: formData });
//       expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
//     });

  it('should check if invalid data entered into the form!', () => {
    component.userPreferenceForm.setValue({
      investmentPurpose: 'Valid Purpose',
      riskTolerance: 'CONSERVATIVE',
      incomeCategory: '20,001 - 40,000',
      lengthOfInvestment: '5-7 year',
      acceptedRoboAdvisor: false,
    });
    expect(component.userPreferenceForm.valid).toEqual(false);
  });

  it("should check if the form opens with the client's investment preferences information", () => {
    const mockUserData = new UserPreference(
    1,
      'ddd',
      'AVERAGE',
      '20,001 - 40,000',
      '5-7 years',
      true,
      true
    );
    component.ngOnInit();
    expect(component.user.preferences).toEqual(mockUserData);
  });

  it('should check if the updated information correctly sent to the mock data', () => {
    component.userPreferenceForm.patchValue({ investmentPurpose: 'new purpose' });
    fixture.detectChanges();
    expect(component.userPreferenceForm.get('investmentPurpose')?.value).toBe(
      'new purpose'
    );
  });
});
