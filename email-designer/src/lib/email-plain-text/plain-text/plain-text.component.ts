import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SunEditorOptions } from 'suneditor/src/options';
import plugins from 'suneditor/src/plugins'; // Import all offical available plugins
import { TemplateBean } from '../../beans/templateBean';

@Component({
  selector: 'app-plain-text',
  templateUrl: './plain-text.component.html',
  styleUrls: ['./plain-text.component.scss']
})
export class PlainTextComponent {
  @Input() plainTxtData!: TemplateBean;

  @Output() onPlainTxtContentChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() plainTxtUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  plainTxtEditorOptions: SunEditorOptions = {
    plugins: plugins,
    minWidth: "100%",
    // height: "80vh",
    buttonList: [
      ["font", "fontSize"],
      ["bold", "underline", "italic", "strike"],
      ["fontColor", "hiliteColor"],
      ["align"],
      ["link"], ['list'], ['indent', 'outdent']
    ],
    font: ['Arial', 'Courier New', 'Georgia', 'Tahoma', 'Trebuchet MS', 'Verdana'],
    // formats: ["h1", 'h2', "h3"],
    // defaultTag: 'h3',
    resizingBar: false,
    defaultStyle: 'font-size: 14px; font-family: Verdana', // Set your desired default font size here
    linkProtocol: '', // Set the default protocol for links,
    linkTargetNewWindow: true,
  };

  loading = true;
  plainTxtContent: any;
  formData = {
    mail_name: '',
    mail_from: '',
    mail_subject: ''
  }

  htmlContent!: string;
  mail_content: any;

  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.plainTxtContent = this.plainTxtData.content;
    this.onPlainTxtContentChange.emit({ ...this.plainTxtData });
  }

  plainTxtChange(data: any) {
    this.plainTxtData = { ...this.plainTxtData, content: data.content }
    this.onPlainTxtContentChange.emit(this.plainTxtData);
    this.plainTxtUpdated.emit(true);
    this.cdr.detectChanges();
  }

  onEmailFormChange(formData: any) {
    //this.mail_content = content;
    this.plainTxtData = { ...this.plainTxtData, ...formData }
    this.onPlainTxtContentChange.emit(this.plainTxtData);
    this.plainTxtUpdated.emit(true);
    this.cdr.detectChanges()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['plainTxtData'] && changes['plainTxtData'].currentValue) {
      console.log(this.plainTxtData, 'plainTxtData');
      const { content, mail_name, mail_from, mail_subject } = this.plainTxtData
      this.plainTxtContent = content;
      this.formData = { mail_name, mail_from, mail_subject }
      this.loading = false
      this.cdr.detectChanges()
    } else {
      this.plainTxtContent = '';
      this.formData = {
        mail_name: '',
        mail_from: '',
        mail_subject: ''
      }
    }
  }
}
