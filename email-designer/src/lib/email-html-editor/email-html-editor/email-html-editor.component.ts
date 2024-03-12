import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
// import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-email-html-editor',
  templateUrl: './email-html-editor.component.html',
  styleUrls: ['./email-html-editor.component.scss']
})
export class EmailHtmlEditorComponent {
  @Input() htmlData: any;

  @Output() onHtmlContentChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() codeUpdated = new EventEmitter<boolean>();
  @Output() addNewTemplateClicked: EventEmitter<void> = new EventEmitter<void>();

  htmlEditorCode = '';
  htmlContent: any;
  loading = true;
  mail_content: any;
  formData = {
    mail_name: '',
    mail_from: '',
    mail_subject: ''
  }

  constructor(private cdr: ChangeDetectorRef) {

  }
  ngOnInit() {

  }
  onCodeUpldated(event: any) {
    this.codeUpdated.emit(true)
  }
  htmlEditorCodeChange(code: any) {
    if (!code) code = '';
    this.htmlEditorCode = code;
    this.htmlData = { ...this.htmlData, content: code }
    this.onHtmlContentChange.emit(this.htmlData)
  }
  onEmailFormChange(formData: any) {
    this.htmlData = { ...this.htmlData, ...formData }
    this.onHtmlContentChange.emit(this.htmlData);
    // this.cdr.detectChanges()
    this.codeUpdated.emit(true)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['htmlData'] && changes['htmlData'].currentValue) {
      const { content, mail_name, mail_from, mail_subject } = this.htmlData
      this.htmlContent = content;
      this.formData = { mail_name, mail_from, mail_subject }
      this.loading = false  // Set loading to false when data is loaded
      this.cdr.markForCheck();
    } else {
      this.htmlContent = '';
      this.formData = {
        mail_name: '',
        mail_from: '',
        mail_subject: ''
      }
      this.cdr.markForCheck();
    }
  }
  onAddNewTemplate() {
    this.addNewTemplateClicked.emit();
  }
}
