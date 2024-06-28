import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ConstantsData } from '../constants'
import { EmailElementService } from '../email-element.service';
import { EmailMessageService } from '../email-message/email-message.service';
import { BlockBean, BlockType, EmailElements, Footer, Logo, StructureType } from '../models';


@Component({
  selector: 'app-email-toolbar',
  templateUrl: './email-toolbar.component.html',
  styleUrls: ['./email-toolbar.component.scss']
})
export class EmailToolbarComponent {
  @ViewChild('fileInput') fileInputElement!: ElementRef;
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
  imageUrl = '';
  imageLink: any = '';
  logoSelected = false;
  emailElements!: EmailElements //= this.es.initialElement;

  blockTypeSubscription!: Subscription;
  footerSubscription!: Subscription;

  selectedFontSize = '14px';
  currentAlignment: 'left' | 'center' | 'right' = 'center';
  footer!: Footer;
  unsubscribeColor!: any;

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
          this.imageLink = this.selectedBlock.link;
          break;
        case this.blockType.Video:
          this.videoUrl = this.selectedBlock.link;
          break;

      }
    });

    this.es.logoSelected$.subscribe(l => {
      this.logoSelected = l;
      if (this.logoSelected) {
        if (this.emailElements.general.logo) {
          this.imageLink = this.emailElements.general.logo.link;
        }
      }
    })
    this.footerSubscription = this.es.footerVisibility$.subscribe((visibility) => {
      if (this.emailElements) {
        this.isFooterVisible = visibility;
        this.footer = this.emailElements.general.footer;
        this.footerContent = this.emailElements.general.footer.content;
        const selectedBrandsLength = this.emailElements.general.footer.brands;
        if (selectedBrandsLength.length > 0) {
          this.selectedBrands = this.emailElements.general.footer.brands;
        } else {
          this.selectedBrands = this.es.initialElement.general.footer.brands;
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
    this.es.editBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, 'src', this.imageUrl);
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
  alignText(alignValue: 'left' | 'center' | 'right'): void {
    this.currentAlignment = alignValue;
    this.es.updateLogoAlign(this.currentAlignment)
  }

  onImageUploadTrigger(data: any) {
    // console.log('Image Upload Trigger', data);
    this.imageUploadTriggered.emit(data);
  }

  imageSelectionTrigger(isLogo = false) {
    // console.log('Image Selection Trigger', isLogo, this.selectedSIindex, this.selectedCindex, this.selectedBIndex);
    this.imageSelectionTriggered.emit({ s: this.selectedSIindex, c: this.selectedCindex, b: this.selectedBIndex, logo: isLogo });
  }

  addVideoLink(videoUrl: string) {
    this.es.editBlockContent(this.selectedSIindex, this.selectedCindex, this.selectedBIndex, 'link', videoUrl);
  }

  getVideoData() {
    if (this.videoUrl) {
      // this.loaderService.loading = true;

      this.es.getVideoData(this.videoUrl, '').subscribe({
        next: (data: any) => {
          // this.loaderService.loading = false;
          if (data.success) {
            this.changeVideoSource(data.image);
            this.addVideoLink(this.videoUrl)
            this.videoUrl = '';
            this.message.success(`Video added successfully!`, 'Success');
          } else if (data === 'notValidUrl') {
            this.message.error(`please enter valid url.`, 'Error');
          } else {
            this.message.error(`${this.videoUrl} Wrong URL`, 'Error');
            console.log(this.videoUrl, 'Video Thumbnail upload Failed!');
          }
        },
        error: (err) => {
          this.message.error(`${this.videoUrl} Wrong URL`, 'Error');
        }
      });
    } else {
      this.message.error(`Enter Video Url!`, 'Error');
      console.log('Enter Video Url');
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    if (this.blockTypeSubscription) {
      this.blockTypeSubscription.unsubscribe();
    }
    this.footerSubscription.unsubscribe();
  }

  closeSidebar(event: any) {
    this.es.elementClickedStatus.next(false);
    this.closeSlideanel.emit(false)
  }
}
