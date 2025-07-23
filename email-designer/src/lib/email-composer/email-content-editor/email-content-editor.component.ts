import { ChangeDetectorRef, Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { EmailElementService } from '../email-element.service';
import { SunEditorOptions } from 'suneditor/src/options';
import plugins from 'suneditor/src/plugins'; // Import all offical available plugins
import { BlockBean, BlockType } from '../models';
import { NgxSuneditorComponent } from 'ngx-sendune-editor';
import { listsRegex } from '../constants';
import { handlePaste } from '../../helpers/utils';

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
      ["align", "list"],
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
    attributesWhitelist: {
      // 'ol': 'style',
      'li': 'style',
      'script': 'src'
    }
  };

  bodyEditorOptions: SunEditorOptions = {
    plugins: plugins,
    minWidth: "100%",
    buttonList: [
      ["font", "fontSize"],
      ["bold", "underline", "italic", "strike"],
      ["fontColor", "hiliteColor"],
      ["align", "list"],
      //  ["formatBlock"],
      ["link"],
    ],
    font: ['Arial', 'Courier New', 'Georgia', 'Tahoma', 'Trebuchet MS', 'Verdana'],
    defaultTag: 'p',
    resizingBar: false,
    defaultStyle: 'font-size: 16px;font-family: Verdana', // Set your desired default font size here
    linkProtocol: '', // Set the default protocol for links
    linkTargetNewWindow: true,
    attributesWhitelist: {
      'li': 'style',
      'script': 'src'
    }
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

    if ((changes['content'] && changes['sIndex']) || changes['bIndex'] || (changes['cIndex'] && (this.bIndex || this.bIndex === 0))) {
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
    const editorInstance = this.ngxSunEditor.getEditor();
    editorInstance.onPaste = (e, cleanData, maxCharCount) => handlePaste(e as ClipboardEvent, cleanData, this.bodyType)
  }
  changeHeaderEditorStyles() {
    if (this.ngxSunEditor) {
      const styles = `font-family:${this.selectedFont};font-size:${this.selectedFontSize};`
      this.ngxSunEditor.setDefaultStyle(styles);
    }
  }
  headerTxtChange(headerContent: any) {
    if (this.containsListTags(headerContent.content)) {
      /* this is for List */

      // Define the styles to be applied to <ul>
      const styles = `font-family:${this.selectedFont};font-size:${this.selectedFontSize};margin:10px 0px 14px 0px;`;
      let changeContent = headerContent.content;
      // Apply styles to the <ul> | <ol> tag
      const updatedContent = changeContent.replace(
        /<(ul|ol)(?![^>]*\sstyle=)(.*?)>/gs,
        `<$1$2 style="${styles}">`
      );

      if (this.selectedBlock.content !== updatedContent) {
        this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'content', updatedContent)
      }

      /* const selection = window.getSelection();
        const styles = `font-family:${this.selectedFont};font-size:${this.selectedFontSize};`;
  
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const anchorNode = range.startContainer;
          let parentElement: HTMLElement | null = (anchorNode.nodeType === Node.TEXT_NODE)
            ? (anchorNode as Text).parentNode as HTMLElement
            : anchorNode as HTMLElement;
  
          // Check if parentElement is a valid HTMLElement
          if (parentElement) {
            switch (parentElement.tagName) {
              case 'LI':
                parentElement = parentElement.closest('div');
                break;
              case 'P':
                parentElement = parentElement.parentNode as HTMLElement || null;
                break;
              case 'SPAN':
                parentElement = parentElement.closest('div');
                break;
              default:
                parentElement = parentElement.closest('div');
            }
          }
          const updatedContent: any = parentElement?.innerHTML.replace(
            listsRegex,
            `<$1$2 style="${styles}">$3</$1>`
          );
          if (this.selectedBlock.content !== updatedContent) {
            this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'content', updatedContent)
          }
        } */

    } else {
      this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'content', headerContent.content)
    }
  }
  ngOnDestroy() {
  }

  containsListTags(html: string): boolean {
    // Create a temporary DOM element to parse HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Check for <ul> or <ol> tags
    const ulTag = tempDiv.querySelector('ul');
    const olTag = tempDiv.querySelector('ol');

    return ulTag !== null || olTag !== null;
  }

}
