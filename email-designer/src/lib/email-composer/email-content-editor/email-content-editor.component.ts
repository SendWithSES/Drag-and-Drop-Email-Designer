import { ChangeDetectorRef, Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { EmailElementService } from '../email-element.service';
import { SunEditorOptions } from 'suneditor/src/options';
import plugins from 'suneditor/src/plugins'; // Import all offical available plugins
import { BlockBean, BlockType } from '../models';
import { NgxSuneditorComponent } from 'ngx-suneditor';

@Component({
  selector: 'app-email-content-editor',
  templateUrl: './email-content-editor.component.html',
  styleUrls: ['./email-content-editor.component.scss']
})
export class EmailContentEditorComponent {
  // @ViewChild('ngxSunEditor') ngxSunEditor!: NgxSuneditorComponent;
  @Input() sIndex!: number;
  @Input() cIndex!: number;
  @Input() bIndex!: number;

  @Input() headerContent: any;
  @Input() bodyContent: any;

  @Input() bodyType!: BlockType;
  @Input() selectedBlock!: BlockBean;
  @Input() content: any

  @ViewChild(NgxSuneditorComponent) ngxSunEditor!: NgxSuneditorComponent;

  blockType = BlockType;

  headerEditorOptions: SunEditorOptions = {
    plugins: plugins,
    minWidth: "100%",
    buttonList: [
      // ["undo", "redo"],
      ["font", "fontSize"], ["formatBlock"],
      ["bold", "underline", "italic", "strike"],
      // ["paragraphStyle", "blockquote"],
      ["fontColor", "hiliteColor"],
      ["align"],
      ["link"],
      // ["fullScreen", "showBlocks", "codeView"],
      // ["preview", "print"],
      // ["save", "template"],
    ],
    font: ['Arial', 'Courier New', 'Georgia', 'Tahoma', 'Trebuchet MS', 'Verdana'],

    formats: ["h1", 'h2', "h3"],
    defaultTag: 'h1',
    resizingBar: false,
    defaultStyle: 'font-size: 28px;font-family: Verdana', // Set your desired default font size here
    linkProtocol: '', // Set the default protocol for links
    linkTargetNewWindow: true,

  };

  bodyEditorOptions: SunEditorOptions = {
    plugins: plugins,
    minWidth: "100%",
    buttonList: [
      ["font", "fontSize"],
      ["bold", "underline", "italic", "strike"],
      ["fontColor", "hiliteColor"],
      ["align"],
      //  ["formatBlock"],
      ["link"],
    ],
    font: ['Arial', 'Courier New', 'Georgia', 'Tahoma', 'Trebuchet MS', 'Verdana'],
    defaultTag: 'p',
    resizingBar: false,
    defaultStyle: 'font-size: 16px;font-family: Verdana', // Set your desired default font size here
    linkProtocol: '', // Set the default protocol for links
  };
  editorOptions!: SunEditorOptions;

  selectedFont: any = 'Verdana'
  selectedFontSize: any = '16px';
  selectedFormat: any = 'P';
  formatList: string[] = [
    'H1', 'H2', 'H3'
  ]
  fontFamilyList: string[] = this.emailElementService.fontFamilyList
  fontSizeList = this.emailElementService.fontSizeList
  fontSizes: any = {
    'H1': '28px',
    'H2': '26px',
    'H3': '22px',
  }
  @ViewChild("editorWrapper") editorWrapper!: ElementRef;
  isSelected = false;
  constructor(private emailElementService: EmailElementService, private cd: ChangeDetectorRef) {

  }
  ngOnInit() {
    if (this.bodyType === this.blockType.Text) {
      this.selectedFontSize = '28px';
      this.selectedFormat = 'H1';
    }
    if (this.bodyType === this.blockType.Text) {
      this.editorOptions = this.headerEditorOptions
    } else {
      this.editorOptions = this.bodyEditorOptions

    }
  }
  ngOnChanges(changes: SimpleChanges) {

    if (changes['bIndex'] || (changes['cIndex'] && (this.bIndex || this.bIndex === 0))) {
      //this.content = '';
      this.selectedBlock = this.emailElementService.getBlockContent(this.sIndex, this.cIndex, this.bIndex);
      //this.content = this.selectedBlock.content;
      this.selectedFont = this.selectedBlock.font;
      this.selectedFontSize = this.selectedBlock.fontSize;
      this.selectedFormat = this.selectedBlock.format;
      this.changeHeaderEditorStyles();
      if (this.selectedBlock && this.selectedBlock.content) {
        this.changeContent(this.selectedBlock.content)
      } else {
        this.changeContent('')
      }
    }
  }
  changeContent(content: string) {
    setTimeout(() => {
      if (this.ngxSunEditor) {
        this.ngxSunEditor.setContents(content);
      }
    }, 100);
  }
  ngAfterViewInit() {
    this.changeHeaderEditorStyles();
  }
  changeHeaderEditorStyles() {
    if (this.ngxSunEditor) {
      const styles = `font-family:${this.selectedFont};font-size:${this.selectedFontSize};`
      this.ngxSunEditor.setDefaultStyle(styles);
    }
  }
  headerTxtChange(headerContent: any) {
    this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'content', headerContent.content)
  }
  ngOnDestroy() {
  }

}
