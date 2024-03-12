import { Component, Input } from '@angular/core';
import { BlockBean } from '../../models';
import { EmailElementService } from '../../email-element.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-email-body',
  templateUrl: './email-body.component.html',
  styleUrls: ['./email-body.component.scss']
})
export class EmailBodyComponent {
  @Input()
  block!: BlockBean;
  bodyTxtFont: any;
  constructor(private emailElementService: EmailElementService, private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    // this.emailElementService.getElements().subscribe((elements) => {
    //   this.bodyTxtFont = elements.general.font?.body?.fontFamily
    // });
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
