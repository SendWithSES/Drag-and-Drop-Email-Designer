import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { EmailHtmlGeneratorService } from "./email-composer/email-html-generator.service";
import { TemplateBean } from "./beans/templateBean";
import { EmailElementService } from "./email-composer/email-element.service";
import { EmailComposerContainerComponent } from "./email-composer/email-composer-container/email-composer-container.component";

@Component({
  selector: "lib-email-designer",
  templateUrl: "./email-editor.component.html",
  styleUrls: [
    "./email-editor.component.scss"
  ],
})
export class EmailEditorComponent {
  @ViewChild('emailComposer') emailComposer!: EmailComposerContainerComponent;

  @Input() type!: string;
  @Input() template!: TemplateBean;
  @Input() isMobileView!: any;
  @Input() isOffCanvasTrigger!: any;

  @Output() emailContentChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageUploadTriggered: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageSelectionTriggered: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeSlideabr: EventEmitter<any> = new EventEmitter<any>();

  content: any = '';
  previewType = 'desktop';
  previewContent: string = '';
  showPreviewPanel = false;

  constructor(
    private eh: EmailHtmlGeneratorService,
    private elementsService: EmailElementService,
  ) {
  }

  exportHtml() {
    let content = this.content.content;
    if (this.type === 'plain_text') {
      content = this.eh.getPainTextHTML(this.content.content);
    } else if (this.type === 'ses_designer') {
      content = this.eh.getEmailHtml(this.content.content);
    }
    content = this.addTargetBlankToLinks(content);
    return (content || '').trim();
  }

  exportJSON() {
    return this.content;
  }

  onEmailContentChange(content: any) {
    this.content = content;
    this.emailContentChanged.emit(content);
  }

  showPreview() {
    this.previewType = 'desktop';
    this.previewContent = this.exportHtml();
    this.showPreviewPanel = true;
  }

  hidePreview() {
    this.showPreviewPanel = false;
  }

  showHtmlPreview() {
    this.previewType = 'html';
    this.previewContent = this.exportHtml();
    this.showPreviewPanel = true;
  }

  onImageSelectionTrigger(data: any) {
    this.imageSelectionTriggered.emit(data);
  }

  onImageUploadTrigger(data: any) {
    this.imageUploadTriggered.emit(data);
  }

  imageSelected(image: any, inputData: any) {
    if (inputData.source === 'footer') {
      inputData.src = image.src;
      this.elementsService.updateOrAddBrandList(null, inputData);
    } else {
      if (inputData.logo) {
        image.sizeType = 'original';
        this.elementsService.updateLogoContent(image);
        this.elementsService.logoSelected$.next(true)
      } else {
        image.imgCreatFrom ='imgRepo';
        this.elementsService.updateImageVideoBlockContent(inputData.s, inputData.c, inputData.b, image);
      }
    }
  }

  openOffcanvas(slidebarStatus: any) {
    this.emailComposer.openOffcanvas(slidebarStatus)
  }

  closeSidebar(event: any) {
    this.closeSlideabr.emit(event);
  }

  addTargetBlankToLinks(htmlContent: string): string {
    try {
      // Parse the input HTML string into a DOM Document
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      // Select all anchor tags
      const anchorTags = doc.querySelectorAll('a');
      // Check if every anchor tag has the target attribute set
      const allHaveTarget = Array.from(anchorTags).every((anchor) => {
        return anchor.hasAttribute('target') && anchor.getAttribute('target') !== '_self'
      });

      if (allHaveTarget) {
        return htmlContent;
      } else {
        //Iterate through each anchor tag
        anchorTags.forEach((anchor) => {
          // Check if 'target' is missing or explicitly set to '_self'
          if (!anchor.hasAttribute('target') || anchor.getAttribute('target') === '_self') {
            anchor.setAttribute('target', '_blank');
          }
        });
        // Serialize the modified document including the <!DOCTYPE html> declaration
        const unformattedHTML = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
        const formattedHTML = this.formatHTML(unformattedHTML);
        return formattedHTML;
      }

    } catch (error) {
      console.error('Error parsing HTML content:', error);
      return htmlContent; // Fallback to original content
    }
  }

  formatHTML(htmlString: any) {
    const indentSize = 2;
    let formattedHTML = '';
    let indentLevel = 0;

    // Split the HTML string into tokens
    const tokens = htmlString
      .replace(/>\s+</g, '><') // Remove extra whitespace between tags
      .split(/(<[^>]+>)/g)    // Split at HTML tags
      .filter((token: any) => token.trim()); // Remove empty tokens

    // Helper function to create indentation
    const createIndent = (level: any) => ' '.repeat(level * indentSize);

    for (let token of tokens) {
      if (token.startsWith('<!--')) {
        // Handle comments: keep them at the current indentation level
        formattedHTML += createIndent(indentLevel) + token.trim() + '\n';
      } else if (token.startsWith('</')) {
        // Closing tag: reduce indent level first
        indentLevel = Math.max(indentLevel - 1, 0); // Avoid negative indentation
        formattedHTML += createIndent(indentLevel) + token.trim() + '\n';
      } else if (token.startsWith('<') && !token.endsWith('/>')) {
        // Opening tag: add tag then increase indent level
        formattedHTML += createIndent(indentLevel) + token.trim() + '\n';
        indentLevel++;
      } else if (token.startsWith('<') && token.endsWith('/>')) {
        // Self-closing tag: keep the same indent level
        formattedHTML += createIndent(indentLevel) + token.trim() + '\n';
      } else {
        // Text content: add at current indent level
        formattedHTML += createIndent(indentLevel) + token.trim() + '\n';
      }
    }

    return formattedHTML;
  }

}
