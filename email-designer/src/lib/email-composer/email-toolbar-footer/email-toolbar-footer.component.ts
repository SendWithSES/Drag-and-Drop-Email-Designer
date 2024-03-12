import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SunEditorOptions } from 'suneditor/src/options';
import plugins from 'suneditor/src/plugins'; // Import all offical available plugins
import { fab } from '@fortawesome/free-brands-svg-icons';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { ConstantsData } from '../constants';
import { BlockType, Brand, Footer } from '../models';
import { EmailElementService } from '../email-element.service';

@Component({
  selector: 'app-email-toolbar-footer',
  templateUrl: './email-toolbar-footer.component.html',
  styleUrls: ['./email-toolbar-footer.component.scss']
})
export class EmailToolbarFooterComponent {
  @ViewChild('footerSunEditor') footerSunEditor!: any; // NgxSuneditorComponent;

  @Input() sIndex!: number;
  @Input() cIndex!: number;
  @Input() bIndex!: number;
  @Input() footerContent: any;
  @Input() footer!: Footer;

  @Input() includeUnsubscribe = true; // Set the initial state
  @Input() unsubscribeColor = ConstantsData.defaultUnsubscribeColor;
  @Input() selectedBrands: any[] = []; // variable to store the selected brands

  @Output() imageUploadTriggered = new EventEmitter<any>();

  blockType = BlockType;
  colorPickerValue: any = '#A09898'

  footerEditorOptions: SunEditorOptions = {
    plugins: plugins,
    minWidth: "100%",
    buttonList: [
      ["font", "fontSize"],
      // ["formatBlock"],
      ["bold", "underline", "italic", "strike"],
      ["fontColor", "hiliteColor"],
      ["align"],
      ["link"],
    ],
    font: ['Arial', 'Courier New', 'Georgia', 'Tahoma', 'Trebuchet MS', 'Verdana'],
    //formats: ["h1", 'h2', "h3"],
    resizingBar: false,
    defaultTag: 'p',
    defaultStyle: 'font-size: 14px;font-family: Verdana', // Set your desired default font size here
    linkProtocol: '', // Set the default protocol for links
    linkNoPrefix: false,
    linkTargetNewWindow: true,

    // showLinkRel: false, // Disable link relation panel
  };
  allBrandIcons: any[] = Object.values(fab);
  selectedValue: any = '';
  iconLink: any;

  selectedColor: string = '#EEEEEE';  // Initial color value

  pngImage: string | null = null;
  width!: number;
  height!: number;
  userData: any = {};

  selectedFont: any = 'Verdana'
  selectedFontSize: any = '14px';

  fontFamilyList: string[];
  fontSizeList;

  constructor(
    private emailElementService: EmailElementService,
  ) {
    this.fontFamilyList = this.emailElementService.fontFamilyList;
    this.fontSizeList = this.emailElementService.fontSizeList;
  }

  ngOnInit() {
  }

  FooterTxtChange(footerContent: any) {
    this.emailElementService.onFooterEdit(footerContent.content)
  }
  unsubscribeStatus() {
    this.includeUnsubscribe = !this.includeUnsubscribe
    this.emailElementService.unsubscribeStatus(this.includeUnsubscribe)
  }
  unsubscribeColorChange() {
    this.emailElementService.updateUnsubscribeColor(this.unsubscribeColor)
  }

  search = (text$: any) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) =>
        term === '' ? of([]) :
          of(this.allBrandIcons
            .filter((v: any) => v.iconName.toLowerCase().includes(term.toLowerCase()))
            .map((v: any) => v.iconName)
            .slice(0, 10))
      )
    );

  formatter = (x: { iconName: string }) => x.iconName;

  onSelectItem(event: NgbTypeaheadSelectItemEvent): void {
    const selectedItem = this.allBrandIcons.find(brand => brand.iconName === event.item);
    if (selectedItem && !this.selectedBrands.some(brand => brand.iconName === selectedItem.iconName)) {
      this.selectedBrands.push(selectedItem);
      this.emailElementService.selectedBrands = this.selectedBrands;
      if (selectedItem.color === undefined) {
        selectedItem.color = '#aaaaaa'
        this.updateFooterSelected(selectedItem);
      } else {
        this.updateFooterSelected(selectedItem);
      }
      this.getSvgIcons(selectedItem)
      setTimeout(() => {
        this.selectedValue = '';
      }, 100);
    }
  }

  deleteIcon(brand: any) {
    if (brand && brand.iconName) {
      const index = this.selectedBrands.indexOf(brand);

      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
      }

      this.selectedValue = '';
      if (this.selectedBrands.length === 0) {
        this.selectedBrands = [];
        this.selectedValue = '';
      }
      this.updateFooterSelected(this.selectedBrands)
    }
  }

  async footerLinkChange(brand: any) {
    try {
      console.log('Image Upload Trigger', brand);
      this.imageUploadTriggered.emit({ ...brand, source: 'footer' });
      // const imgUrl = await this.getImageUrl(brand)
      // brand.src = imgUrl;
      // this.updateFooterSelected(brand)
    } catch (err) {
      console.log('Footer link error', err);
    }
  }

  isValidLink(link: string): boolean {
    // return Boolean(new URL(link));
    try {
      const url = new URL(link);
      return !!url.host;
    } catch (error) {
      return false;  // the URL is not valid
    }
  }

  iconColorChange(brand: Brand): void {
    this.updateFooterSelected(brand);
    this.getSvgIcons(brand)
  }
  updateFooterSelected(brandList?: any) {
    this.emailElementService.updateOrAddBrandList(this.selectedBrands, brandList);

  }
  getSvgIcons(selectedItem: any) {
    setTimeout(() => {
      const faIcon = document.getElementById(`toolBar-icon-wrapper-${selectedItem.iconName}`)
      if (faIcon) {
        const svgTxt = faIcon?.innerHTML;
        const SvgColorFill = this.updateFillColor(svgTxt, selectedItem.color);
        const updatedSvgTxt = this.updateFontSize(SvgColorFill, '30px');
        selectedItem.svgTxt = updatedSvgTxt;
      }
    }, 0)
  }
  updateFillColor(svgTxt: string, color: string): string {
    // Replace the fill attribute with the new color
    const updatedSvgTxt = svgTxt.replace(/fill=".*?"/, `fill="${color}"`);
    return updatedSvgTxt;
  }

  updateFontSize(svgTxt: string, size: string): string {
    // Add the style attribute with the font-size to the path element
    const updatedSvgTxt = svgTxt.replace(/<svg/, `<svg height="${size}"`);
    return updatedSvgTxt;
  }

  convertSvgToPng(selectedItem: any): void {
    const url = this.getSvgUrl(selectedItem.svgTxt);
    this.svgUrlToPng(url, (imgData) => {
      this.pngImage = imgData;
      selectedItem.src = imgData; // Set the src property here
      // console.log(this.pngImage)
      URL.revokeObjectURL(url);
    });
  }

  getSvgUrl(svg: string): string {
    return URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  }

  svgUrlToPng(svgUrl: string, callback: (imgData: string) => void): void {

    const svgImage = new Image();
    document.body.appendChild(svgImage);
    svgImage.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = svgImage.width;
      canvas.height = svgImage.height;

      const canvasCtx = canvas.getContext('2d');
      canvasCtx?.drawImage(svgImage, 0, 0);

      const imgData = canvas.toDataURL('image/png');
      callback(imgData);

      document.body.removeChild(svgImage);
    };

    svgImage.src = svgUrl;
  }
  onFontChange(font: string) {
    this.selectedFont = font
    /* this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'font', this.selectedFont);
    this.changeHeaderEditorStyles() */
    this.emailElementService.onFooterFontChange(this.selectedFont);
    this.changeHeaderEditorStyles();
  }
  onFontSizeChange() {
    /* this.emailElementService.editBlockContent(this.sIndex, this.cIndex, this.bIndex, 'fontSize', this.selectedFontSize)
    this.changeHeaderEditorStyles() */
    this.emailElementService.onFooterSizeChange(this.selectedFontSize)
    this.changeHeaderEditorStyles();
  }
  ngOnChanges(changes: SimpleChanges) {

    if (changes['footer']) {
      //this.selectedBlock = this.emailElementService.getBlockContent(this.sIndex, this.cIndex, this.bIndex);
      if (this.footer.font) {
        this.selectedFont = this.footer.font;
      }
      if (this.footer.fontSize) {
        this.selectedFontSize = this.footer.fontSize;
      }
      this.changeHeaderEditorStyles();
    }
  }
  ngAfterViewInit() {
    this.changeHeaderEditorStyles();
  }
  changeHeaderEditorStyles() {
    if (this.footerSunEditor) {
      const styles = `font-family:${this.selectedFont};font-size:${this.selectedFontSize};`
      this.footerSunEditor.setDefaultStyle(styles);
    }
  }
  onFooterTxtPaste(data: any) {
    //const { event, cleanData, maxCharCount, core } = data
    console.log('onFooterTxtPaste clean data')
    return false;
  }

}