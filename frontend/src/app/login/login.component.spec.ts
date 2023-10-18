import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { UserPreference } from '../models/UserPreferences';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { ReactiveFormsModule } from '@angular/forms';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const userlist: User[] = [
    {
      id: 1,
      personalName: "Ish",
      email: "isha@gmail.com",
      country: "India",
      dob: "06/07/2001",
      riskAppetite: "Conservative",
      preferences: new UserPreference(1, 'ddd', 'AVERAGE', '20,001 - 40,000', '5-7 years', true, true)
    },
    {
      id: 2,
      personalName: "Pranjal",
      email: "Pranjal@gmail.com",
      country: "India",
      dob: "07/07/2001",
      riskAppetite: "Moderate" ,
      preferences: new UserPreference(2, '', '', '', '', false, true)
    }


  ];

  let authServiceMock: any = jasmine.createSpyObj('AuthService', ['login']);
  authServiceMock.login.and.returnValue(of(userlist));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[HttpClientModule,ToastrModule.forRoot(),ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call AuthService.login when login button is clicked', () => {
  //   const email = 'isha@gmail.com';

  //   component.loginForm.value.email = email;

  //   const loginButton = fixture.debugElement.nativeElement.querySelector('button');
  //   loginButton.click();

  //   expect(authServiceMock.login).toHaveBeenCalledWith(email);
  // });



});
