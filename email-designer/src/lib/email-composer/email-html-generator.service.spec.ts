import { TestBed } from '@angular/core/testing';

import { EmailHtmlGeneratorService } from './email-html-generator.service';

describe('EmailHtmlGeneratorService', () => {
  let service: EmailHtmlGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailHtmlGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
