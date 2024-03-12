import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailButtonComponent } from './email-button.component';

describe('EmailButtonComponent', () => {
  let component: EmailButtonComponent;
  let fixture: ComponentFixture<EmailButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailButtonComponent]
    });
    fixture = TestBed.createComponent(EmailButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
