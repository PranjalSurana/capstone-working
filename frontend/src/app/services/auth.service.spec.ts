import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return true for an existing email', () => {
  //   const emailToVerify = 'isha@gmail.com';
  //   const result = service.verifyEmail(emailToVerify);
  //   expect(result).toBe(true);
  // });

  // it('should return false for a non-existing email', () => {
  //   const emailToVerify = 'nonexistent@example.com';
  //   const result = service.verifyEmail(emailToVerify);
  //   expect(result).toBe(false);
  // });
});
