import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHtmlEditorComponent } from './email-html-editor.component';

describe('EmailHtmlEditorComponent', () => {
  let component: EmailHtmlEditorComponent;
  let fixture: ComponentFixture<EmailHtmlEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailHtmlEditorComponent]
    });
    fixture = TestBed.createComponent(EmailHtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
