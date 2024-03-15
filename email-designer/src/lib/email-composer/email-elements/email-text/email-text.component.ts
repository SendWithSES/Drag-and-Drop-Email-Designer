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

    // Check if the innerText of the temporary element contains non-whitespace characters
    return tempElement.innerText.trim().length > 0;
  }
}
