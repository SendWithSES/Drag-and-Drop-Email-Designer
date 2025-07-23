import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SunEditorOptions } from 'suneditor/src/options';
import plugins from 'suneditor/src/plugins'; // Import all offical available plugins
import { TemplateBean } from '../../beans/templateBean';
import { NgxSuneditorComponent } from 'ngx-sendune-editor';
import { handlePaste } from '../../helpers/utils';

@Component({
  selector: 'app-plain-text',
  templateUrl: './plain-text.component.html',
  styleUrls: ['./plain-text.component.scss']
})
export class PlainTextComponent {
  @ViewChild(NgxSuneditorComponent) ngxSunEditor!: NgxSuneditorComponent;
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
    attributesWhitelist: {
      // 'ol': 'style',
      'li': 'style',
      'script': 'src'
    }
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

    const editorInstance = this.ngxSunEditor?.getEditor();
    if (!editorInstance) return;

    const checkbox = document.querySelector('#unsubscribeCheckbox') as HTMLInputElement;
    if (!checkbox) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = editorInstance.getContents(true);
    checkbox.checked = tempDiv.innerText.includes('{{Unsubscribe}}');

    checkbox.onchange = () => this.toggleUnsubLink(checkbox.checked);

    this.cdr.detectChanges();
  }

  checkUnsubLink() {
    const editorToolbar = document.querySelector('.se-btn-tray');
    if (!editorToolbar || document.querySelector('#unsubscribeCheckbox')) return;

    const wrapper = document.createElement('div');
    wrapper.classList.add('unsubscribe-wrapper', 'se-btn-module', 'se-btn-module-border');

    wrapper.innerHTML = `
    <input type="checkbox" id="unsubscribeCheckbox" />
    <label for="unsubscribeCheckbox" class='check-box-label'>Include Unsubscribe Link</label>`;

    editorToolbar.appendChild(wrapper);

    const editorInstance = this.ngxSunEditor?.getEditor();
    if (!editorInstance) return;

    const checkbox = wrapper.querySelector('#unsubscribeCheckbox') as HTMLInputElement;
    checkbox.checked = editorInstance.getContents(true).includes('{{Unsubscribe}}');

    checkbox.addEventListener('change', () => this.toggleUnsubLink(checkbox.checked));
  }

  toggleUnsubLink(isChecked: boolean) {
    const editorInstance = this.ngxSunEditor?.getEditor();
    if (!editorInstance) return;

    setTimeout(() => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = editorInstance.getContents(true);

      tempDiv.querySelectorAll('*').forEach((el: any) => {
        if (el.innerText.includes('{{Unsubscribe}}')) el.remove();
      });

      if (isChecked) tempDiv.innerHTML += ' {{Unsubscribe}}';

      editorInstance.setContents(tempDiv.innerHTML);
    }, 0);
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

    setTimeout(() => {
      const editorInstance = this.ngxSunEditor?.getEditor();
      if (!editorInstance) return; // Ensure editorInstance is available
      editorInstance.onPaste = (e, cleanData, maxCharCount) => handlePaste(e as ClipboardEvent, cleanData,'plainTxt');
      this.checkUnsubLink();
    }, 500);
  }

  /*  ngAfterViewInit() {
     const editorInstance = this.ngxSunEditor.getEditor();
     editorInstance.onPaste = (e, cleanData, maxCharCount) => handlePaste(e as ClipboardEvent, cleanData);
   } */
}
