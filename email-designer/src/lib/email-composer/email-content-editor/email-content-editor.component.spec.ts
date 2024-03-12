import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailContentEditorComponent } from './email-content-editor.component';

describe('EmailContentEditorComponent', () => {
  let component: EmailContentEditorComponent;
  let fixture: ComponentFixture<EmailContentEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailContentEditorComponent]
    });
    fixture = TestBed.createComponent(EmailContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
