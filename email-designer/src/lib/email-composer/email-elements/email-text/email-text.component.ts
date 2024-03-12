import { Component, Input } from '@angular/core';
import { BlockBean } from '../../models';
import { EmailElementService } from '../../email-element.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-email-text',
  templateUrl: './email-text.component.html',
  styleUrls: ['./email-text.component.scss']
})
export class EmailTextComponent {
  @Input()
  block!: BlockBean;
  headerFont: any;
  constructor(private emailElementService: EmailElementService, private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    // this.emailElementService.getElements().subscribe((elements) => {
    //   this.headerFont = elements.general.font?.header?.fontFamily
    // });
    //console.log(this.block)
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
