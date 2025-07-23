import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlockBean } from '../../models';

@Component({
  selector: 'app-email-body',
  templateUrl: './email-body.component.html',
  styleUrls: ['./email-body.component.scss']
})
export class EmailBodyComponent {
  @Input()
  block!: BlockBean;
  bodyTxtFont: any;
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

    // Check if the innerText of the temporary element contains non-whitespace characters
    return tempElement.innerText.trim().length > 0;
  }
}
