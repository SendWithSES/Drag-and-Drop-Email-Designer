import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailComposerContainerComponent } from './email-composer-container.component';

describe('EmailComposerContainerComponent', () => {
  let component: EmailComposerContainerComponent;
  let fixture: ComponentFixture<EmailComposerContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailComposerContainerComponent]
    });
    fixture = TestBed.createComponent(EmailComposerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
