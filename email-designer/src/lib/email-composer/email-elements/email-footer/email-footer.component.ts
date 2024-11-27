import { Component, Input } from '@angular/core';
import { Footer } from '../../models';
import { EmailElementService } from '../../email-element.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConstantsData } from '../../constants';

@Component({
  selector: 'app-email-footer',
  templateUrl: './email-footer.component.html',
  styleUrls: ['./email-footer.component.scss']
})
export class EmailFooterComponent {
  @Input() footer!: Footer;
  footerSelected!: boolean
  defaultBrands: any = this.emailElementService.initialElement.general.footer.brands;
  includeUnsubscribe!: any;
  defaultUnsubscribeColor = ConstantsData.defaultUnsubscribeColor;

  constructor(private emailElementService: EmailElementService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.emailElementService.footerVisibility$.subscribe(l => {
      this.footerSelected = l
    });

    this.footer.brands = this.footer.brands.filter(brand => brand.link && brand.link?.trim() !== "");
  }

  footerClick() {
    this.emailElementService.resetBlockSelection()
    this.emailElementService.logoSelected$.next(false);
    this.emailElementService.footerVisibility$.next(true)
    this.emailElementService.elementClickedStatus.next(true);
  }
  getSafeHtml(content: any): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }
  trackByFn(index: number, item: any): any {
    return index; // or provide a unique identifier for the item
  }
  isValidLink(link: any): boolean {
    try {
      const url = new URL(link);
      return !!url.host;
    } catch (error) {
      return false;
    }
  }
}
