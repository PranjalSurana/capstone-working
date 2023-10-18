import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuynsellComponent } from './buynsell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('BuynsellComponent', () => {
  let component: BuynsellComponent;
  let fixture: ComponentFixture<BuynsellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuynsellComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuynsellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
