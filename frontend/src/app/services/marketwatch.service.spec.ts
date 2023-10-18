import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { MarketwatchService } from './marketwatch.service';

describe('MarketwatchService', () => {
  let service: MarketwatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MarketwatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
