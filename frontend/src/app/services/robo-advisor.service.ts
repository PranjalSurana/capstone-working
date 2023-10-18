import { Injectable } from '@angular/core';
import { RoboAdvisor } from '../models/RoboAdvisor';
import { Observable, catchError, map, of, retry, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpEvent,
} from '@angular/common/http';
import { User } from '../models/User';
import { UserPreference } from '../models/UserPreferences';

@Injectable({
  providedIn: 'root',
})
export class RoboAdvisorService {
  private roboAdvisorUrl = 'http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:8080/roboadvisor';

  constructor(private http: HttpClient) {}

  //   private userPreference: preferences =
  //       localStorage?.getItem('user') !== null
  //         ? JSON.parse(localStorage.getItem('user')!).preferences
  //         : new UserPreference(-1, '', '', '', '', false, false);
  //
  private userPreference: UserPreference =
    localStorage?.getItem('user') !== null
      ? JSON.parse(localStorage.getItem('user')!).userPreference
      : new UserPreference(-1, '', '', '', '', false, false);

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

  getTrades(): Observable<RoboAdvisor[]> {
    //       localStorage.setItem('user', JSON.stringify({ ...this.user, ...data }));
    console.log(this.user);
    //       this.userPreference = this.user.preferences
    return this.http
      .post<RoboAdvisor[]>(this.roboAdvisorUrl, this.user)
      .pipe(catchError(this.handleError));
  }

  handleError(response: HttpErrorResponse) {
    console.log(response);

    return throwError(
      () =>
        response.error ||
        'Something went wrong while getting recommended stocks'
    );
  }
}
