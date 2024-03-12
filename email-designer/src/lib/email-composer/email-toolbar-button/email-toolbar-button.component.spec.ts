import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailToolbarButtonComponent } from './email-toolbar-button.component';

describe('EmailToolbarButtonComponent', () => {
  let component: EmailToolbarButtonComponent;
  let fixture: ComponentFixture<EmailToolbarButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailToolbarButtonComponent]
    });
    fixture = TestBed.createComponent(EmailToolbarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
