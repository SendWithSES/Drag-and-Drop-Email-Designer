import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorComponent } from './email-editor.component';

describe('EmailEditorComponent', () => {
  let component: EmailEditorComponent;
  let fixture: ComponentFixture<EmailEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailEditorComponent]
    });
    fixture = TestBed.createComponent(EmailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
