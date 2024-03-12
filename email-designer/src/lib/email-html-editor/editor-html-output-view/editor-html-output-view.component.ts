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
      this.blob = new Blob([this.htmlContent], { type: "text/html" });
      this.blobUrl = URL.createObjectURL(this.blob);

    }
  }
}
