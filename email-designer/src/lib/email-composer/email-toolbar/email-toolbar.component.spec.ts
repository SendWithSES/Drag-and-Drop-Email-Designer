import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailToolbarComponent } from './email-toolbar.component';

describe('EmailToolbarComponent', () => {
  let component: EmailToolbarComponent;
  let fixture: ComponentFixture<EmailToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailToolbarComponent]
    });
    fixture = TestBed.createComponent(EmailToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
