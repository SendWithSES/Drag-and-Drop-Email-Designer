import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailToolbarFooterComponent } from './email-toolbar-footer.component';

describe('EmailToolbarFooterComponent', () => {
  let component: EmailToolbarFooterComponent;
  let fixture: ComponentFixture<EmailToolbarFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailToolbarFooterComponent]
    });
    fixture = TestBed.createComponent(EmailToolbarFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
