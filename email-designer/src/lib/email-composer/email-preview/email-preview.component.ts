import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConstantsData } from '../constants';

@Component({
  selector: 'app-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss'],
})
export class EmailPreviewComponent {
  @Output() backToEditor: EventEmitter<any> = new EventEmitter<any>();
  @Input() isPlainText: any;
  @Input() previewContent: any;
  @Input() previewType: string = 'desktop';

  blob!: Blob;
  blobUrl = '';
  bgColor = ConstantsData.bgPickerValue;

  constructor() { }

  ngOnInit() {
    this.blob = new Blob([this.previewContent], { type: "text/html" });
    this.blobUrl = URL.createObjectURL(this.blob);
  }
  
  back() {
    this.backToEditor.emit()
  }
  
  onLoad() {}
  
  showDesktop() {
    this.previewType = 'desktop';
  }
  
  showMobile() {
    this.previewType = 'mobile';
  }

  showHtml() {
    this.previewType = 'html';
  }

  copyHtml() {
    let text_elem = document.createElement('textarea');
    text_elem.style.position = 'absolute';
    text_elem.style.left = '-9999px';
    text_elem.style.top = '0';
    text_elem.value = this.previewContent;
    document.body.appendChild(text_elem);
    text_elem.select();
    document.execCommand('copy');
  }
}
