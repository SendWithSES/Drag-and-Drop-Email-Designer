import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailBodyComponent } from './email-body.component';

describe('EmailBodyComponent', () => {
  let component: EmailBodyComponent;
  let fixture: ComponentFixture<EmailBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailBodyComponent]
    });
    fixture = TestBed.createComponent(EmailBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
