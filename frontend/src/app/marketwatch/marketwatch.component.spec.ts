import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketwatchComponent } from './marketwatch.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MarketwatchComponent', () => {
  let component: MarketwatchComponent;
  let fixture: ComponentFixture<MarketwatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketwatchComponent ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
