import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlockBean } from '../../models';

@Component({
  selector: 'app-email-text',
  templateUrl: './email-text.component.html',
  styleUrls: ['./email-text.component.scss']
})
export class EmailTextComponent {
  @Input()
  block!: BlockBean;
  headerFont: any;
  @Input() ismobileView!: boolean;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getSafeHtml(content: any): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }
  hasText(content: any): boolean {
    if (content === undefined) {
      return false;
    }
    // Create a temporary element to extract the visible text
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;

    // Remove newline characters, zero-width spaces, and the word joiner character (U+2060)
    const textContent = tempElement.innerText.replace(/[\n\u200B\u2060]/g, '').trim();

    // Check if the innerText of the temporary element contains non-whitespace characters
    return textContent.length > 0;
  }
}
