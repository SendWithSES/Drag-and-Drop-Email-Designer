import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor-html-output-view',
  templateUrl: './editor-html-output-view.component.html',
  styleUrls: ['./editor-html-output-view.component.scss']
})
export class EditorHtmlOutputViewComponent {
  @Input() htmlContent = '';
  @ViewChild('htmlEditorOutput') htmlEditorOutput: any;

  blob!: Blob;
  blobUrl = ''
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['htmlContent'].currentValue && this.htmlContent) {
      this.createBlob()
    } else {
      this.blobUrl = ''
    }
  }
  createBlob() {
    if (this.htmlContent) {
      const htmlContent = this.addTargetBlankToLinks(this.htmlContent)
      this.blob = new Blob([htmlContent], { type: "text/html" });
      this.blobUrl = URL.createObjectURL(this.blob);
    }
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
        anchor.hasAttribute('target') && anchor.getAttribute('target') !== '_self'
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
        return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
      }

    } catch (error) {
      console.error('Error parsing HTML content:', error);
      return htmlContent; // Fallback to original content
    }
  }

}
