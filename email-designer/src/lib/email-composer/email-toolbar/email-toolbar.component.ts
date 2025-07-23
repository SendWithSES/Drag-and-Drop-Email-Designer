import { debounceTime, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ConstantsData, logoAlignment, logoTypesData } from '../constants'
import { EmailElementService } from '../email-element.service';
import { EmailMessageService } from '../email-message/email-message.service';
import { BlockBean, BlockType, EmailElements, Footer, Logo, StructureType } from '../models';
import { EmailToolbarFooterComponent } from '../email-toolbar-footer/email-toolbar-footer.component';


@Component({
  selector: 'app-email-toolbar',
  templateUrl: './email-toolbar.component.html',
  styleUrls: ['./email-toolbar.component.scss']
})
export class EmailToolbarComponent {
  @ViewChild('fileInput') fileInputElement!: ElementRef;
  @ViewChild('toolbarFooter') toolbarFooter!: EmailToolbarFooterComponent;
  @Input() isMobileView: any;

  @Output() oneClicked = new EventEmitter<void>();
  @Output() twoClicked = new EventEmitter<void>();
  @Output() imageUploadTriggered = new EventEmitter<any>();
  @Output() imageSelectionTriggered = new EventEmitter<any>();
  @Output() closeSlideanel = new EventEmitter<any>();

  selectedSIindex!: number;
  selectedCindex!: number;
  selectedBIndex!: number;
  selectedBType!: BlockType
  blockType = BlockType;

  headerContent: any = ''; // Bind this to ngModel
  bodyContent: any = '';
  btnTextContent: any = '';
  btnLink: any = '';
  footerContent = '';
  selectedBlock!: BlockBean;
  isFooterVisible = false;
  fontName: any = 'Verdana';
  fontSizeCount: any = '16';
  btnAlign: any = 'center'
  selectedBrands: any;
  includeUnsubscribe: any;

  bgPickerValue: any = ConstantsData.bgPickerValue;
  contentBgValue: any = ConstantsData.contentBgValue;
  btnBgColorValue: any = ConstantsData.btnBgColorValue;
  btnTxtColorValue: any = ConstantsData.btnTxtColorValue;
  dividerBgClrValue: any = ConstantsData.dividerBgClrValue

  videoUrl: any = '';
  imageUrl:any = '';
  imageLink: any = '';
  imageAltTxt: any = '';
  logoSelected = false;
  emailElements!: EmailElements //= this.es.initialElement;

  blockTypeSubscription!: Subscription;
  footerSubscription!: Subscription;
  logoSubscription!: Subscription;

  selectedFontSize = '14px';
  currentLogoAlignment: logoAlignment = logoAlignment.Center;
  logoAlignment = logoAlignment;
  footer!: Footer;
  unsubscribeColor!: any;

  originalWidth: any;
  selectedSize: string = 'original';
  logoSizesData = logoTypesData;
  imageSrcStatus!: boolean;
  savedVideoUrl: any;
  logoBlock!:Logo;

  constructor(
    private es: EmailElementService,
    private message: EmailMessageService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.es.emailElements$.subscribe((emailElements) => {
      this.emailElements = emailElements;
      this.bgPickerValue = (emailElements.general && emailElements.general.background) ? emailElements.general.background : ConstantsData.bgPickerValue;
      this.contentBgValue = (emailElements.general && emailElements.general.background) ? emailElements.general.contentBackground : ConstantsData.contentBgValue;
    });
    this.es.selectedStructureIndex$.subscribe(i => this.selectedSIindex = i);
    this.es.selectedStructureColumn$.subscribe(i => this.selectedCindex = i);
    this.es.selectedBlockIndex$.subscribe(i => {
      this.selectedBIndex = i
    });
    this.es.selectedBlockType$.subscribe(b => {
      this.selectedBType = b;
      this.isFooterVisible = false
      this.selectedBlock = this.es.getBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex);
      switch (b) {
        case this.blockType.Text:
          this.headerContent = this.selectedBlock.content
          break;
        case this.blockType.Body:
          this.bodyContent = this.selectedBlock.content
          break;
        case this.blockType.Button:
          this.btnTextContent = this.selectedBlock.content;
          this.btnTxtColorValue = this.selectedBlock.color;
          this.btnBgColorValue = this.selectedBlock.backgroundColor;
          this.btnLink = this.selectedBlock.link
          this.fontName = this.selectedBlock.font //  ? this.selectedBlock.font : this.fontName;
          const fontSizeCount: any = this.selectedBlock.fontSize  // ? this.selectedBlock.fontSize : this.fontSizeCount;
          this.fontSizeCount = fontSizeCount.replace('px', '');
          this.btnAlign = this.selectedBlock.align ? this.selectedBlock.align : this.btnAlign
          break;
        case this.blockType.Divider:
          this.dividerBgClrValue = this.selectedBlock.color
          break;
        case this.blockType.Image:
          this.imageUrl = this.selectedBlock.imageUrl;
          this.imageLink = this.selectedBlock.link;
          this.imageAltTxt = this.selectedBlock.altTxt;
          break;
        case this.blockType.Video:
          this.savedVideoUrl = this.videoUrl = this.selectedBlock.link;
          this.imageAltTxt = this.selectedBlock.altTxt;
          break;

      }
    });

    this.logoSubscription = this.es.logoSelected$.pipe(
      debounceTime(50)
    ).subscribe(l => {
      this.logoSelected = l;
      if (this.logoSelected) {
        this.logoBlock = this.emailElements.general.logo;
        if (this.emailElements.general.logo) {
          this.imageLink = this.emailElements.general.logo.link;
          this.imageAltTxt = this.emailElements.general.logo.altTxt;
          this.currentLogoAlignment = (this.emailElements.general.logo.align as logoAlignment) ?? 'center';
          const logoData = this.emailElements.general.logo;
          const logoOriginalWidth = logoData.originalWidth;
          const logoWidth = logoData.width;
          this.originalWidth = logoOriginalWidth ?? logoWidth;
          if (logoData.src !== '') {
            this.selectedSize = logoData.sizeType ?? 'original';
          } else {
            this.selectedSize = ''
          }
          this.imageSrcStatus = ((logoData.src === '') ? true : false);
          if (logoOriginalWidth === undefined) {
            logoData.originalWidth = logoWidth;
          }
        }
      }
    })
    this.footerSubscription = this.es.footerVisibility$.subscribe((visibility) => {
      if (this.emailElements) {
        this.isFooterVisible = visibility;
        this.footer = this.emailElements.general.footer;
        this.footerContent = this.emailElements.general.footer.content;
        if (this.isFooterVisible) {
          setTimeout(() => {
            if (this.toolbarFooter) {
              this.toolbarFooter.scrollToSearch();
            }
          });
        }
        const selectedBrandsLength = this.emailElements.general.footer.brands;
        if (selectedBrandsLength.length > 0) {
          const selectedBrands = this.emailElements.general.footer.brands;
          this.selectedBrands = selectedBrands.filter(brand => brand.link?.trim());
        } else {
          this.selectedBrands = [];
          // this.selectedBrands = this.es.initialElement.general.footer.brands;
          // this.emailElements.general.footer.brands = this.es.initialElement.general.footer.brands
        }
        // this.includeUnsubscribe = this.footer.unsubscribe ? this.footer.unsubscribe : this.es.initialElement.general.footer.unsubscribe;
        this.includeUnsubscribe = this.footer.unsubscribe;
        this.unsubscribeColor = this.footer.unsubscribeColor ? this.footer.unsubscribeColor : ConstantsData.defaultUnsubscribeColor;

      }
    });

    this.headerContent = '<h1> </h1>';
  }
  showNoSelectionError() {
    this.message.error('Please Select a column to insert Block', 'Error');
  }
  onTwoClick() {
    this.es.addStucture(StructureType.TwoColumn)
    this.twoClicked.emit();
  }

  onOneClick() {
    this.es.addStucture(StructureType.OneColumn)
    this.oneClicked.emit();
  }
  onTextClick() {
    if (this.selectedCindex === -1) {
      this.showNoSelectionError()
      return;
    }
    this.es.addBlockToStucture(BlockType.Text)
  }
  onBodyTextClick() {
    if (this.selectedCindex === -1) {
      this.showNoSelectionError()
      return;
    }
    this.es.addBlockToStucture(BlockType.Body)
  }
  onImageClick() {
    if (this.selectedCindex === -1) {
      this.showNoSelectionError()
      return;
    }
    this.es.addBlockToStucture(BlockType.Image)
  }
  onVideoClick() {
    if (this.selectedCindex === -1) {
      this.showNoSelectionError()
      return;
    }
    this.es.addBlockToStucture(BlockType.Video)
  }
  onButtonClick() {
    if (this.selectedCindex === -1) {
      this.showNoSelectionError()
      return;
    }
    this.es.addBlockToStucture(BlockType.Button)
  }
  onDividerClick() {
    if (this.selectedCindex === -1) {
      this.showNoSelectionError()
      return;
    }
    this.es.addBlockToStucture(BlockType.Divider)
  }
  updateBgColor() {
    this.es.updateBgColor(this.bgPickerValue)

  }
  updateContentBgColor() {
    this.es.updateContentBgColor(this.contentBgValue)

  }
  dividerBgChange() {
    this.es.editBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, 'color', this.dividerBgClrValue);
  }
  changeImageSource(data: BlockBean) {
    this.es.updateImageVideoBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, data);
  }
  changeImageUrl() {
    this.es.editBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, 'imageUrl', this.imageUrl, 'imgUrl');
  }
  changeImageLink() {
    this.es.editBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, 'link', this.imageLink);
  }
  changeVideoSource(data: BlockBean) {
    this.es.updateImageVideoBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, data);
  }
  changeLogoSource(data: Logo) {
    this.es.updateLogoContent(data);

  }
  updateLogoLink() {
    this.es.updateLogoLink(this.imageLink);
    // this.imageLink = '';
  }
  alignText(alignValue: logoAlignment): void {
    this.currentLogoAlignment = alignValue;
    this.es.updateLogoAlign(this.currentLogoAlignment)
  }

  onImageUploadTrigger(data: any) {
    this.imageUploadTriggered.emit(data);
  }

  imageSelectionTrigger(isLogo = false) {
    this.imageSelectionTriggered.emit({ s: this.selectedSIindex, c: this.selectedCindex, b: this.selectedBIndex, logo: isLogo });
  }

  addVideoLink(videoUrl: string) {
    this.es.editBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, 'link', videoUrl);
  }

  getVideoData() {
    if (this.savedVideoUrl != this.videoUrl) {
      if (this.videoUrl) {
        // this.loaderService.loading = true;

        this.es.getVideoData(this.videoUrl, '').subscribe({
          next: (data: any) => {
            // this.loaderService.loading = false;
            if (data.success) {
              this.changeVideoSource(data.image);
              this.addVideoLink(this.videoUrl)
              // this.videoUrl = '';
              this.message.success(`Video added successfully!`, 'Success');
            } else if (data === 'notValidUrl') {
              this.message.error(`please enter valid url.`, 'Error');
            } else {
              this.message.error(`${this.videoUrl} Wrong URL`, 'Error');
            }
          },
          error: (err) => {
            this.message.error(`${this.videoUrl} Wrong URL`, 'Error');
          }
        });
      } else {
        this.message.error(`Enter Video Url!`, 'Error');
      }
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    if (this.blockTypeSubscription) {
      this.blockTypeSubscription.unsubscribe();
    }
    this.footerSubscription.unsubscribe();
    this.logoSubscription.unsubscribe();
  }

  closeSidebar(event: any) {
    this.es.elementClickedStatus.next(false);
    this.closeSlideanel.emit(false)
  }

  logoResize(type: string) {
    if (!this.logoSelected || !this.emailElements.general.logo || !this.emailElements.general.logo.src) return;
    const sizes: any = {
      small: 80,
      medium: 100,
      large: 120
    };
    this.selectedSize = type;
    if (type === 'original') {
      sizes['original'] = this.originalWidth;
    }
    this.es.updateLogoSize(type, sizes[type], this.originalWidth)
  }

  changeImageAltTxt() {
    this.es.editBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, 'altTxt', this.imageAltTxt);
  }

  updateLogoAltTxt() {
    this.es.updateLogoAltTxt(this.imageAltTxt);
  }

  changeVideoImageAltTxt() {
    this.es.editBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, 'altTxt', this.imageAltTxt);
  }
}
