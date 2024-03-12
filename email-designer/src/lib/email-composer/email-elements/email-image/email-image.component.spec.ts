import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailImageComponent } from './email-image.component';

describe('EmailImageComponent', () => {
  let component: EmailImageComponent;
  let fixture: ComponentFixture<EmailImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailImageComponent]
    });
    fixture = TestBed.createComponent(EmailImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
