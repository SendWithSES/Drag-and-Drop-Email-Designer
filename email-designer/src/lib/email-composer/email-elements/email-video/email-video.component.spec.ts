import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVideoComponent } from './email-video.component';

describe('EmailVideoComponent', () => {
  let component: EmailVideoComponent;
  let fixture: ComponentFixture<EmailVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVideoComponent]
    });
    fixture = TestBed.createComponent(EmailVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
