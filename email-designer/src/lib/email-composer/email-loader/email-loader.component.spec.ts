import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLoaderComponent } from './email-loader.component';

describe('EmailLoaderComponent', () => {
  let component: EmailLoaderComponent;
  let fixture: ComponentFixture<EmailLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailLoaderComponent]
    });
    fixture = TestBed.createComponent(EmailLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
