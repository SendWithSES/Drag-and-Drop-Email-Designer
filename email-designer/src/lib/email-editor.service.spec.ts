import { TestBed } from '@angular/core/testing';

import { EmailEditorService } from './email-editor.service';

describe('EmailEditorService', () => {
  let service: EmailEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
