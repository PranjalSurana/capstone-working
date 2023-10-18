import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradehistoryComponent } from './tradehistory.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TradehistoryComponent', () => {
  let component: TradehistoryComponent;
  let fixture: ComponentFixture<TradehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradehistoryComponent ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
