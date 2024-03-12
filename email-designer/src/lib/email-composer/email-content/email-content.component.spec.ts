import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailContentComponent } from './email-content.component';

describe('EmailContentComponent', () => {
  let component: EmailContentComponent;
  let fixture: ComponentFixture<EmailContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailContentComponent]
    });
    fixture = TestBed.createComponent(EmailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
