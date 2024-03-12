import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorHtmlOutputViewComponent } from './editor-html-output-view.component';

describe('EditorHtmlOutputViewComponent', () => {
  let component: EditorHtmlOutputViewComponent;
  let fixture: ComponentFixture<EditorHtmlOutputViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorHtmlOutputViewComponent]
    });
    fixture = TestBed.createComponent(EditorHtmlOutputViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
