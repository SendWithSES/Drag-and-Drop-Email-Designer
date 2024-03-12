import { Component, Input } from '@angular/core';
import { EmailElementService } from '../email-element.service';
import { BlockType } from '../models';
import { ConstantsData } from '../constants'

@Component({
  selector: 'app-email-toolbar-button',
  templateUrl: './email-toolbar-button.component.html',
  styleUrls: ['./email-toolbar-button.component.scss']
})
export class EmailToolbarButtonComponent {
  @Input() sIndex!: number;
  @Input() cIndex!: number;
  @Input() bIndex!: number;

  blockType = BlockType;
  @Input() btnBgColorValue: any = ConstantsData.btnBgColorValue;
  @Input() btnTxtColorValue: any = ConstantsData.btnTxtColorValue;
  @Input() btnTextContent: any = '';
  @Input() btnLink: any = '';
  @Input() selectedFont: any;
  @Input() selectedFontSize: any;

  @Input() currentAlignment!: 'left' | 'center' | 'right';

  fontFamilyList: string[] = [
    'Arial', 'Courier New',
    'Georgia', 'Tahoma', 'Trebuchet MS', 'Verdana'
  ]
  fontSizeList = [
    9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72
  ]
  constructor(private emailElementService: EmailElementService) { }

  ngOnInit() { }

  btnBgColorChange() {
    this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'backgroundColor', this.btnBgColorValue)
  }
  btnTxtColorChange() {
    this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'color', this.btnTxtColorValue);
  }
  btnTxtContentChange() {
    this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'content', this.btnTextContent);
  }
  btnLinkChange() {
    this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'link', this.btnLink)
  }
  onFontChange(event: any): void {
    // this.emailElementService.onFontChange(event.target.value);
    this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'font', event.target.value)

  }
  onFontSizeChange(event: any): void {
    // this.emailElementService.onFontSizeChange(event.target.value);
    this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'fontSize', `${event.target.value}px`)
  }
  alignText(alignValue: 'left' | 'center' | 'right'): void {
    this.currentAlignment = alignValue;
    this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'align', alignValue);
  }
}
