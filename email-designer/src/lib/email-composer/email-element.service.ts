import { Injectable } from '@angular/core';
import { Block, BlockBean, BlockType, Brand, EmailElements, Logo, Structure, StructureType } from './models';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ConstantsData } from './constants'

@Injectable({
  providedIn: 'any'
})
export class EmailElementService {
  apiPath = '';
  initialElement = {
    "structures": [
      {
        "type": "1",
        "blocks": [
          [
            {
              "type": "Image",
              "content": "",
              "backgroundColor": "",
              "color": "",
              "link": "",
              "src": "",
              "width": "",
              "height": "",
              "isSelected": false,
              "font": "",
              "fontSize": "",
              "align": "",
              "format": ""
            },
            {
              "type": "Button",
              "content": "",
              "backgroundColor": "#EEEEEE",
              "color": "#AAAAAA",
              "link": "",
              "src": "",
              "width": "",
              "height": "",
              "isSelected": false,
              "font": "Verdana",
              "fontSize": "16px",
              "align": "",
              "format": ""
            }
          ]
        ],
        "backgroundColor": "",
        "color": "",
        "isSelected": false
      },
      {
        "type": "2",
        "blocks": [
          [
            {
              "type": "Image",
              "content": "",
              "backgroundColor": "",
              "color": "",
              "link": "",
              "src": "",
              "width": "",
              "height": "",
              "isSelected": false,
              "font": "",
              "fontSize": "",
              "align": "",
              "format": ""
            },
            {
              "type": "Text",
              "content": "",
              "backgroundColor": "",
              "color": "",
              "link": "",
              "src": "",
              "width": "",
              "height": "",
              "isSelected": false,
              "font": "Verdana",
              "fontSize": "28px",
              "align": "",
              "format": "H1"
            },
            {
              "type": "Body",
              "content": "",
              "backgroundColor": "",
              "color": "",
              "link": "",
              "src": "",
              "width": "",
              "height": "",
              "isSelected": false,
              "font": "Verdana",
              "fontSize": "16px",
              "align": "",
              "format": "P"
            }
          ],
          [
            {
              "type": "Image",
              "content": "",
              "backgroundColor": "",
              "color": "",
              "link": "",
              "src": "",
              "width": "",
              "height": "",
              "isSelected": false,
              "font": "",
              "fontSize": "",
              "align": "",
              "format": ""
            },
            {
              "type": "Text",
              "content": "",
              "backgroundColor": "",
              "color": "",
              "link": "",
              "src": "",
              "width": "",
              "height": "",
              "isSelected": false,
              "font": "Verdana",
              "fontSize": "28px",
              "align": "",
              "format": "H1"
            },
            {
              "type": "Body",
              "content": "",
              "backgroundColor": "",
              "color": "",
              "link": "",
              "src": "",
              "width": "",
              "height": "",
              "isSelected": false,
              "font": "Verdana",
              "fontSize": "16px",
              "align": "",
              "format": "P"
            }
          ]
        ],
        "backgroundColor": "",
        "color": "",
        "isSelected": false
      }
    ],
    "general": {
      "footer": {
        "content": "",
        "font": "Verdana",
        "fontSize": "14px",
        brands: [
          {
            "prefix": "fab", "iconName": "x-twitter",
            "icon": ConstantsData.twitterPath,
            "src": ConstantsData.twitterSrc,
            "svgTxt": ConstantsData.twitterSvg,
            "link": ConstantsData.twitterLink,
            "color": "#aaaaaa",
          },
          {
            "prefix": "fab", "iconName": "github",
            "icon": ConstantsData.gitHubPath,
            "src": ConstantsData.gitHubSrc,
            "svgTxt": ConstantsData.gitHubSvg,
            "link": ConstantsData.gitHubLink,
            "color": "#aaaaaa",
          }
        ],
        "unsubscribe": true,
        // "unsubscribeColor": "#EEEEEE",
      },
      "logo": {
        "src": "",
        "link": "",
        "align": "center"
      },
      "color": "#000000",
      "background": "#EEEEEE",
      "contentBackground": "#FFFFFF"
    }
  }
  fontFamilyList: string[] = [
    'Arial', 'Courier New',
    'Georgia', 'Tahoma', 'Trebuchet MS', 'Verdana'
  ];
  fontSizeList = [
    {
      val: '9px', label: 9
    },
    {
      val: '10px', label: 10
    },
    {
      val: '11px', label: 11
    },
    {
      val: '12px', label: 12
    },
    {
      val: '14px', label: 14
    },
    {
      val: '16px', label: 16
    },
    {
      val: '18px', label: 18
    },
    {
      val: '20px', label: 20
    },
    {
      val: '22px', label: 22
    },
    {
      val: '24px', label: 24
    },
    {
      val: '26px', label: 26
    },
    {
      val: '28px', label: 28
    },
    {
      val: '36px', label: 36
    },
    {
      val: '48px', label: 48
    },
    {
      val: '72px', label: 72
    }
  ];
  emailElements!: EmailElements// = this.initialElement;
  emailElements$: Subject<EmailElements> = new Subject<EmailElements>();
  selectedStructureIndex$: Subject<number> = new Subject<number>();
  selectedStructureColumn$: Subject<number> = new Subject<number>();
  selectedStructureIndex = 0;
  selectedStructureColumn = 0;
  selectedBlockType$: Subject<BlockType> = new Subject<BlockType>();
  selectedBlockType!: BlockType;
  selectedBlockIndex$: Subject<number> = new Subject<number>();
  structureAdded$: Subject<number> = new Subject<number>();
  blockAdded$: Subject<number> = new Subject<number>();
  logoSelected$: Subject<boolean> = new Subject<boolean>();
  showPriview$: Subject<boolean> = new Subject<boolean>();
  selectedBlockIndex!: number;
  showLoader$: Subject<boolean> = new Subject<boolean>();
  contentUpdated$: Subject<boolean> = new Subject<boolean>();
  footerVisibility$: Subject<boolean> = new Subject<boolean>();
  contactsCount = 0;
  contactsList: any[] = [];
  selectedBrands: any[] = [];
  elementClickedStatus: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  setSelectedStructureIndex(index: number, resetLogoFooter = true) {
    this.selectedStructureIndex = index;
    this.selectedStructureIndex$.next(index);
    if (resetLogoFooter) {
      this.logoSelected$.next(false);
      this.footerVisibility$.next(false)
    }
  }
  setSelectedStructureColumn(index: number) {
    this.selectedStructureColumn = index;
    this.selectedStructureColumn$.next(index);

  }
  setSelectedBlock(index: number, type: BlockType, sIndex: number, cIndex: number) {
    this.selectedBlockType = type;
    this.selectedBlockIndex = index;
    this.setSelectedStructureIndex(sIndex)
    this.setSelectedStructureColumn(cIndex)
    this.selectedBlockIndex$.next(index);
    this.selectedBlockType$.next(type);

    this.logoSelected$.next(false);
    this.footerVisibility$.next(false)
  }
  resetBlockSelection(onlyBlock = false) {
    if (!onlyBlock) {
      this.setSelectedStructureIndex(-1, false);
      this.setSelectedStructureColumn(-1)
    }
    this.selectedBlockIndex$.next(-1);
    this.selectedBlockIndex = -1;
    this.selectedBlockType$.next(BlockType.Other);
  }
  resetAllSelection() {
    this.setSelectedStructureIndex(-1, false);
    this.setSelectedStructureColumn(-1)
    this.selectedBlockIndex$.next(-1);
    this.selectedBlockIndex = -1;
    this.selectedBlockType$.next(BlockType.Other);
    this.footerVisibility$.next(false)
    this.logoSelected$.next(false)
  }
  addStucture(type: StructureType): void {
    if (!this.emailElements) {
      this.emailElements = this.initialElement;
    }
    this.structureAdded$.next(this.emailElements.structures.length)
    this.emailElements.structures.push(this.addNewStucture(type));
    this.emailElements$.next(this.emailElements);
    this.contentUpdated$.next(true);
  }
  deleteStucture(sIndex: number): void {
    this.emailElements.structures.splice(sIndex, 1);
    this.emailElements$.next(this.emailElements);
    this.contentUpdated$.next(true);
  }

  swapStucture(sIndex1: number, sIndex2: number) {
    if (this.emailElements
      && this.emailElements.structures[sIndex1]
      && this.emailElements.structures[sIndex2]
    ) {
      this.swapPositions(this.emailElements.structures, sIndex1, sIndex2)
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  resetElements() {
    this.emailElements = { general: { ...this.initialElement.general, isLoading: true }, structures: [] };
    this.emailElements$.next({ ...this.emailElements });
    this.resetAllSelection();
  }
  setElements(emailElements: EmailElements) {
    // if (emailElements && emailElements.general && emailElements.general.footer && emailElements.general.footer.brands.length === 0) {
    //   emailElements.general.footer.brands = this.initialElement.general.footer.brands;
    // }
    this.emailElements = emailElements;
    this.emailElements$.next({ ...emailElements });
    this.resetAllSelection();
  }
  getElements() {
    return this.emailElements$;
  }
  addBlockToStucture(type: BlockType) {
    const sIndex = this.selectedStructureIndex ? this.selectedStructureIndex : 0;
    const cIndex = this.selectedStructureColumn;
    if (this.emailElements && this.emailElements.structures[sIndex]) {
      if (!this.emailElements.structures[sIndex].blocks) {
        this.emailElements.structures[sIndex].blocks = []
      }
      if (!this.emailElements.structures[sIndex].blocks?.length) {
        this.emailElements.structures[sIndex].blocks?.push([])
      }
      if (cIndex === 1 && this.emailElements.structures[sIndex].blocks?.length < 2) {
        this.emailElements.structures[sIndex].blocks[1] = []
      }
      this.blockAdded$.next(this.emailElements.structures[sIndex].blocks[cIndex].length)
      this.emailElements.structures[sIndex].blocks[cIndex]?.push(this.addNewElement(type))
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  deleteBlockInStucture(sIndex: number, cIndex: number, bIndex: number) {
    const structure = this.emailElements.structures[sIndex];
    if (this.emailElements
      && structure
      && structure.blocks
      && structure.blocks?.length
      && structure.blocks[cIndex]
      && structure.blocks[cIndex][bIndex]
    ) {
      this.emailElements.structures[sIndex].blocks[cIndex].splice(bIndex, 1);
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  getBlockDetails(sIndex: number, cIndex: number, bIndex: number) {
    const structure = this.emailElements.structures[sIndex];
    if (this.emailElements
      && structure
      && structure.blocks
      && structure.blocks?.length
      && structure.blocks[cIndex]
      && structure.blocks[cIndex][bIndex]
    ) {
      return structure.blocks[cIndex][bIndex];
    }
    return null;
  }

  swapBlockInStucture(sIndex: number, cIndex: number, bIndex1: number, bIndex2: number) {
    const structure = this.emailElements.structures[sIndex];
    if (this.emailElements
      && structure
      && structure.blocks
      && structure.blocks?.length
      && structure.blocks[cIndex]
      && structure.blocks[cIndex][bIndex1]
      && structure.blocks[cIndex][bIndex2]
    ) {
      this.swapPositions(structure.blocks[cIndex], bIndex1, bIndex2)
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  swapPositions(array: any[], a: number, b: number) {
    [array[a], array[b]] = [array[b], array[a]]
  }
  addNewStucture(type: StructureType): Structure {
    if (type === StructureType.TwoColumn) {
      return new Structure({ type, blocks: [[], []] });
    }
    return new Structure({ type, blocks: [[]] });
  }

  addNewElement(type: BlockType) {
    let block: Block;
    switch (type) {
      case BlockType.Text:
        block = new Block({ type, font: 'Verdana', fontSize: '28px', format: 'H1' });
        break;
      case BlockType.Body:
        block = new Block({ type, font: 'Verdana', fontSize: '16px', format: 'P' })
        break;
      case BlockType.Image:
        block = new Block({ type });
        break;
      case BlockType.Video:
        block = new Block({ type })
        break;
      case BlockType.Button:
        block = new Block({ type, backgroundColor: ConstantsData.btnBgColorValue, color: ConstantsData.btnTxtColorValue, content: '', font: 'Verdana', fontSize: '16px', link: '' });
        break;
      case BlockType.Divider:
        block = new Block({ type, color: ConstantsData.dividerBgClrValue })
        break;
      case BlockType.Other:
        block = new Block({ type })
        break;
    }
    return block;
  }

  updateLogoContent(updatedData: Logo) {
    if (
      this.emailElements.general &&
      this.emailElements.general.logo
    ) {
      const imageData = this.emailElements.general.logo
      this.emailElements.general.logo = { ...imageData, ...updatedData }
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  updateLogoLink(link: string) {
    if (
      this.emailElements.general &&
      this.emailElements.general.logo
    ) {
      this.emailElements.general.logo.link = link;
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }

  updateLogoAltTxt(altTxt: string) {
    if (
      this.emailElements.general &&
      this.emailElements.general.logo
    ) {
      this.emailElements.general.logo.altTxt = altTxt;
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }

  updateLogoAlign(alignType: any) {
    if (this.emailElements.general && this.emailElements.general.logo) {
      this.emailElements.general.logo.align = alignType;
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }

  updateLogoSize(updatedSizeType: string, updatedWidth: any, originalWidth: any) {
    if (this.emailElements.general && this.emailElements.general.logo) {
      this.emailElements.general.logo.width = updatedWidth || originalWidth;
      this.emailElements.general.logo.sizeType = updatedSizeType || 'original';
      this.emailElements$.next(this.emailElements);
      // this.contentUpdated$.next(sizeType !== updatedSizeType);
    }
  }

  updateBgColor(value: string) {
    if (
      this.emailElements.general
    ) {
      this.emailElements.general.background = value;
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }

  updateContentBgColor(value: string) {
    if (
      this.emailElements.general
    ) {
      this.emailElements.general.contentBackground = value;
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  editBlockContent(sIndex: number, cIndex: number, bIndex: number, property: string, value: string, imgCreatFrom?: any): void {
    const structure = this.emailElements.structures[sIndex];
    if (structure && structure.blocks && structure.blocks[cIndex]) {
      this.emailElements.structures[sIndex].blocks[cIndex][bIndex][property] = value;
      if (imgCreatFrom) {
        this.emailElements.structures[sIndex].blocks[cIndex][bIndex]['imgCreatFrom'] = imgCreatFrom;
      }
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }

  updateImageVideoBlockContent(sIndex: number, cIndex: number, bIndex: number, updatedData: BlockBean): void {
    const structure = this.emailElements.structures[sIndex];
    if (structure && structure.blocks && structure.blocks[cIndex] && structure.blocks[cIndex][bIndex]) {
      const imageData = structure.blocks[cIndex][bIndex];
      Object.assign(imageData, updatedData);
      // this.emailElements.structures[sIndex].blocks[cIndex][bIndex] = { ...imageData, ...updatedData }
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }

  getBlockContent(sIndex: any, cIndex: any, bIndex: any) {
    const structure = this.emailElements.structures[sIndex];
    if (structure && structure.blocks[cIndex] && structure.blocks[cIndex][bIndex]) {
      return structure.blocks[cIndex][bIndex]
    } else {
      return ''
    }
  }

  loadVideoJSON(id: any) {
    return this.http.get<any>('https://vimeo.com/api/v2/video/' + id + '.json');
  }

  isYouTubeUrl(videoUrl: string): boolean {
    return videoUrl.includes('https://www.youtube.com/watch?v=') || videoUrl.includes('https://youtu.be/') || videoUrl.includes('https://www.youtube.com/shorts');
  }

  extractYouTubeVideoId(videoUrl: string): string | null {
    const match = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|.*[?&]v=))([^\/&?]+)/);
    return match ? match[1] : null;
  }

  loadVimeoVideoJSON(id: any) {
    return this.http.get<any>('https://vimeo.com/api/v2/video/' + id + '.json');
  }

  checkYoutubeUrl(videoUrl: any) {
    return this.http.get<any>(`https://youtube.com/oembed?url=${videoUrl}`)
  }

  getVideoData(videoUrl: string, awsRegion: string) {
    return new Observable((observer) => {
      if (this.isYouTubeUrl(videoUrl)) {
        const videoId = this.extractYouTubeVideoId(videoUrl);

        if (videoId) {
          this.checkYoutubeUrl(videoUrl).subscribe({
            next: (data: any) => {
              if (data && data.thumbnail_url) {
                let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                let image = new Image();

                const minimalWidth = 120
                const minimalHeight = 90

                image.onload = () => {
                  if (image.width === minimalWidth && image.height === minimalHeight) {
                    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                    const image = new Image();
                    image.src = thumbnailUrl;
                    image.onload = () => {
                      observer.next({ success: true, image: { src: thumbnailUrl, width: image.width, height: image.height } });
                    }
                  } else {
                    observer.next({ success: true, image: { src: thumbnailUrl, width: image.width, height: image.height } });
                  }
                };

                image.src = thumbnailUrl;

              } else {
                observer.next('')
              }
            },
            error: (error: any) => {
              observer.error(error);
            }
          });
        } else {
          observer.next('');
        }

      } else if (videoUrl.indexOf('vimeo.com/') !== -1) {
        let splitPos = videoUrl.indexOf('.com/');
        let videoId: any;

        if (splitPos !== -1) {
          let idAndParams = videoUrl.slice(splitPos + 5);
          let paramPos = idAndParams.indexOf('#t');
          if (paramPos !== -1) {
            videoId = idAndParams.slice(0, paramPos);
          } else {
            videoId = idAndParams;
          }
        }

        this.loadVimeoVideoJSON(videoId).subscribe({
          next: (data: any) => {
            if (data && data[0].thumbnail_large) {
              const image = new Image();
              const thumbnailUrl = data[0].thumbnail_large + '.jpg';
              image.src = thumbnailUrl;
              image.onload = () => {
                observer.next({ success: true, image: { src: thumbnailUrl, width: image.width, height: image.height } });
              }
            } else {
              observer.next('');
            }
          },
          error: (error: any) => {
            observer.error(error);
          }
        });
      } else {
        observer.next('notValidUrl');
      }
    });
  }

  generateUniqueId() {
    return new Date().getTime().toString() + Math.floor(Math.random() * 1000).toString() + Math.floor(Math.random() * 1000).toString();
  }

  onFooterEdit(footerContent: string) {
    if (!this.emailElements) {
      this.emailElements = { ...this.initialElement }; // Initialize if not already
    }
    if (this.emailElements.general && this.emailElements.general.footer) {
      this.emailElements.general.footer.content = footerContent
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  onFooterFontChange(font: string) {
    if (!this.emailElements) {
      this.emailElements = { ...this.initialElement }; // Initialize if not already
    }
    if (this.emailElements.general && this.emailElements.general.footer) {
      this.emailElements.general.footer.font = font
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  onFooterSizeChange(fontSize: string) {
    if (!this.emailElements) {
      this.emailElements = { ...this.initialElement }; // Initialize if not already
    }
    if (this.emailElements.general && this.emailElements.general.footer) {
      this.emailElements.general.footer.fontSize = fontSize
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  unsubscribeStatus(status: any) {
    if (!this.emailElements) {
      this.emailElements = { ...this.initialElement }; // Initialize if not already
    }
    if (this.emailElements.general && this.emailElements.general.footer) {
      this.emailElements.general.footer.unsubscribe = status
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }
  updateUnsubscribeColor(unsubscribeColor: any) {
    if (!this.emailElements) {
      this.emailElements = { ...this.initialElement }; // Initialize if not already
    }
    if (this.emailElements.general && this.emailElements.general.footer) {
      this.emailElements.general.footer.unsubscribeColor = unsubscribeColor
      this.emailElements$.next(this.emailElements);
      this.contentUpdated$.next(true);
    }
  }

  updateOrAddBrandList(selectedBrand: Brand[] | null = null, brandData: any): void {
    // this.initializeEmailElements();
    if (!this.emailElements) {
      this.emailElements = { ...this.initialElement };
    }
    if (!this.emailElements.general.footer.brands) {
      this.emailElements.general.footer.brands = [];
    }
    if (selectedBrand && selectedBrand.length > 0) {
      this.emailElements.general.footer.brands = selectedBrand;
    } else if (this.selectedBrands.length > 0) {
      this.emailElements.general.footer.brands = this.selectedBrands;
    }
    if (brandData !== null) {
      const brandToUpdate = this.emailElements.general.footer.brands.find(brand => brand.iconName === brandData.iconName);
      if (brandToUpdate) {
        brandToUpdate.link = brandData.link;
        if (brandData.color) {
          brandToUpdate.color = brandData.color;
        }
        if (brandData.src) {
          brandToUpdate.src = brandData.src;
        }
        if (brandData.svgTxt) {
          brandToUpdate.svgTxt = brandData.svgTxt;
        }
      }
    }
    this.emailElements$.next(this.emailElements);
    this.contentUpdated$.next(true);
  }
  clearLogo() {
    this.emailElements.general.logo = {
      "src": "",
      "link": "",
      "align": "center"
    }
    this.emailElements$.next(this.emailElements);
    this.contentUpdated$.next(true);
  }
}