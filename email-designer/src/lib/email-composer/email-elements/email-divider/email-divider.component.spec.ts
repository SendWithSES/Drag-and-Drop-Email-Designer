import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDividerComponent } from './email-divider.component';

describe('EmailDividerComponent', () => {
  let component: EmailDividerComponent;
  let fixture: ComponentFixture<EmailDividerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailDividerComponent]
    });
    fixture = TestBed.createComponent(EmailDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
