import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLogoComponent } from './email-logo.component';

describe('EmailLogoComponent', () => {
  let component: EmailLogoComponent;
  let fixture: ComponentFixture<EmailLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailLogoComponent]
    });
    fixture = TestBed.createComponent(EmailLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
