import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { EmailElementService } from '../email-element.service';
import { EmailElements } from '../models';

@Component({
  selector: 'app-email-composer-container',
  templateUrl: './email-composer-container.component.html',
  styleUrls: ['./email-composer-container.component.scss']
})
export class EmailComposerContainerComponent {
  @Input() sesDesignerData: any = {};

  @Output() imageUploadTriggered: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageSelectionTriggered: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEmailContentChange: EventEmitter<EmailElements> = new EventEmitter<EmailElements>();

  mail_content: any;
  ses_data: any;
  loading = true;
  formData = {
    mail_name: '',
    mail_from: '',
    mail_subject: ''
  }
  sesContent: any;

  constructor(private es: EmailElementService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.es.emailElements$.subscribe((emailElements: EmailElements) => {
      this.ses_data = emailElements;
      this.onEmailContentChange.emit({ ...this.sesDesignerData, content: emailElements });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sesDesignerData'] && changes['sesDesignerData'].currentValue) {
      const { content, mail_name, mail_from, mail_subject } = this.sesDesignerData;
      this.sesContent = content;
      this.formData = { mail_name, mail_from, mail_subject }
      setTimeout(() => {
        this.es.setElements(this.sesContent)
        this.cd.detectChanges()
      }, 100);
    } else {
      this.es.resetElements();
      this.cd.detectChanges();
    }
  }

  updateEmailContentStaus(status: boolean) {
    this.es.contentUpdated$.next(status);
  }

  onEmailFormChange(formData: any) {
    this.sesDesignerData = { ...this.sesDesignerData, ...formData }
    this.onEmailContentChange.emit({ ...this.sesDesignerData })
    this.cd.detectChanges();
  }

  onImageSelectionTrigger(data: any) {
    // console.log('onImageSelectionTrigger', data);
    this.imageSelectionTriggered.emit(data);
  }

  onImageUploadTrigger(data: any) {
    // console.log('onImageUploadTrigger', data);
    this.imageUploadTriggered.emit(data);
  }
}
