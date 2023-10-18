import { TestBed } from '@angular/core/testing';

import { BuynsellService } from './buynsell.service';
import { HttpClientModule } from '@angular/common/http';

describe('BuynsellService', () => {
  let service: BuynsellService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(BuynsellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
