import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { RoboAdvisorService } from './robo-advisor.service';

describe('RoboAdvisorService', () => {
  let service: RoboAdvisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule]
      });
    service = TestBed.inject(RoboAdvisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
