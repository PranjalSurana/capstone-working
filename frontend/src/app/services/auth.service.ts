import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from '../models/User';
import { Observable, catchError, map, of, retry, throwError } from 'rxjs';
import { UserPreference } from '../models/UserPreferences';
// import { mockUsers } from '../mock-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private verifyUrl = 'http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:3000/verify';
  private registerUrl = 'http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:3000/users/register';
  private loginUrl = 'http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:8080/user/login';
  private registerUrl1 = 'http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:8080/user/register';
  private verifyEmailUrl = 'http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:8080/user/verifyEmail';
  private addUserPreferenceURL = 'http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:8080/user/addPreference';
  private updateUserPreferenceURL =
    'http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:8080/user/updatePreference';
  private updateUserDataURL = 'http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:8080/user/updatePreference';

  //   userlist = mockUsers; // Importing mock data from file

  private user: User =
    localStorage?.getItem('user') !== null
      ? JSON.parse(localStorage.getItem('user')!)
      : new User(
          -1,
          '',
          '',
          '',
          '',
          '',
          new UserPreference(-1, '', '', '', '', false, true)
        ); //TODO: Fix this later

  constructor(private http: HttpClient) {}

  getUser(): User {
    return this.user;
  }

  //   retrieveDetails() {
  //     //console.log(this.userlist[0]);
  //     const userData = this.userlist[0];
  //     return userData;
  //   }
  // else {
  //   console.log("LOG IN###")
  // }
  // }

  verifyUser(user: User) {
    return this.http.post<any>(this.verifyUrl, user);
  }

  // register(user: User): Observable<User> {
  //   return this.http
  //     .post<User>(this.registerUrl, user)
  //     .pipe(catchError(this.handleError));
  // }

  register(user: User): Observable<User> {
    //     console.log(user);
    return this.http
      .post<User>(this.registerUrl1, JSON.stringify(user), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  isLoggedIn() {
    if (this.getUser().email != '') {
      return true;
    } else {
      return false;
    }
  }

  login(email: string): Observable<User> {
    console.log(this.getUser());
    return this.http
      .get<User>(this.loginUrl + '/' + email)
      .pipe(catchError(this.handleError));
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(null));
  }

  verifyEmail(email: string): Observable<number> {
    return this.http
      .get<number>(this.verifyEmailUrl + '/' + email) // Use 'any' as the response type
      .pipe(
        catchError(this.handleError),
        map((response: any) => {
          if (typeof response === 'number') {
            return response; // If the response is already a number, return it
          } else if (
            typeof response === 'object' &&
            response.hasOwnProperty('value')
          ) {
            return Number(response.value); // Extract and convert the 'value' property to a number
          } else {
            throw new Error('Invalid response format');
          }
        })
      );
  }

  updateUserData(data: any): Observable<User> {
    localStorage.setItem('user', JSON.stringify({ ...this.user, ...data }));
    this.user = { ...this.user, ...data };
    //       console.log(this.user);
    return of(this.user);
  }

  addUserPreference(data: any): Observable<UserPreference> {
    //     console.log(JSON.stringify(data))
    data.preferences.id = this.user.id;
    data.preferences.isEmpty = false;
    localStorage.setItem('user', JSON.stringify({ ...this.user, ...data }));
    this.user = { ...this.user, ...data };
    //         console.log("From add user preference function\n"+JSON.stringify(this.user));
    //         console.log(JSON.stringify(data.preferences))
    return this.http
      .post<UserPreference>(
        this.addUserPreferenceURL,
        JSON.stringify(data.preferences),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  updateUserPreference(data: any): Observable<User> {
    console.log(this.user);
    console.log(data);
    data.preferences.id = this.user.id;
    localStorage.setItem('user', JSON.stringify({ ...this.user, ...data }));
    this.user = { ...this.user, ...data };
    console.log('From update user preference function' + this.user);
    return this.http
      .put<User>(
        this.updateUserPreferenceURL,
        JSON.stringify(data.preferences),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          }),
        }
      )
      .pipe(catchError(this.handleError));
    //     return of(this.user);
  }
  //
  //   updatePreference(userPreference): Observable<User> {
  //   console.log(userPreference);
  //     return this.http
  //     .put(<User>(this.updateUserPreferenceURL, user))
  //           .pipe(catchError(this.handleError));
  //   }

  handleError(response: HttpErrorResponse) {
    console.log(response);

    return throwError(
      () => response.error || 'Something went wrong while logging in'
    );
  }
}
