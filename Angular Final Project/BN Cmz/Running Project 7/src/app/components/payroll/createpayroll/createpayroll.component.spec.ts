import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepayrollComponent } from './createpayroll.component';

describe('CreatepayrollComponent', () => {
  let component: CreatepayrollComponent;
  let fixture: ComponentFixture<CreatepayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatepayrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatepayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
