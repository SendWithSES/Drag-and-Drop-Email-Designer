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
}
