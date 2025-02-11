import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  @ViewChild('brandSearch') brandSearch!: ElementRef;

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
    this.selectedBrands = this.selectedBrands.map((brand: any) => ({
      ...brand,
      changed: false,
      linkChanged: false
    }));
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
    const selectedItemData = this.allBrandIcons.find(brand => brand.iconName === event.item);
    if (selectedItemData && !this.selectedBrands.some(brand => brand.iconName === selectedItemData.iconName)) {

      const selectedItem = { ...selectedItemData }; // Shallow copy of the object

      this.selectedBrands.push(selectedItem);
      this.emailElementService.selectedBrands = this.selectedBrands;

      if (selectedItem.color === undefined) {
        selectedItem.color = '#aaaaaa';
      }

      // Fetch and process SVG icons
      this.getSvgIcons(selectedItem, () => {
        this.updateFooterSelected(selectedItem);
      });

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
      if (this.isValidLink(brand.link) && ((brand.changed || brand.linkChanged) || brand.src === undefined)) {
        if (brand.changed || brand.src == undefined) {
          this.getSvgIcons(brand, () => { });
          setTimeout(() => {
            this.imageUploadTriggered.emit({ ...brand, source: 'footer' });
          }, 2);
        } else {
          this.updateFooterSelected(brand);
        }
        brand.changed = false;
        brand.linkChanged = false;
      }
    } catch (err) {
      brand.changed = true;
      brand.linkChanged = true;
    }
  }

  isValidLink(link: string): boolean {
    try {
      const url = new URL(link);
      // return !!url.host;
      return url.protocol === 'https:' || url.protocol === 'http:';
      // && url.hostname.endsWith('.com');
    } catch (error) {
      return false;  // the URL is not valid
    }
  }

  iconColorChange(brand: Brand): void {
    if (!brand.changed) {
      brand.changed = true;
    }
    /*  this.getSvgIcons(brand, () => {
       this.updateFooterSelected(brand);
     }); */
  }

  updateFooterSelected(brandList?: any) {
    this.emailElementService.updateOrAddBrandList(this.selectedBrands, brandList);

  }
  getSvgIcons(selectedItem: any, callback: () => void) {
    setTimeout(() => {
      const faIcon = document.getElementById(`toolBar-icon-wrapper-${selectedItem.iconName}`)
      if (faIcon) {
        const svgTxt = faIcon?.innerHTML;
        const SvgColorFill = this.updateFillColor(svgTxt, selectedItem.color);
        const updatedSvgTxt = this.updateFontSize(SvgColorFill, '30px');
        selectedItem.svgTxt = updatedSvgTxt;
        callback();
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['footer']) {
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
    return false;
  }

  iconLinkChange(selectedBrand: any) {
    if (selectedBrand.link !== '' && this.isValidLink(selectedBrand.link)) {
      if (!selectedBrand.linkChanged) {
        selectedBrand.linkChanged = true;
      }
    }
  }

  scrollToSearch(): void {
    this.brandSearch.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

}