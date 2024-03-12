import { Component, Input } from '@angular/core';
import { BlockBean } from '../../models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EmailElementService } from '../../email-element.service';

@Component({
  selector: 'app-email-button',
  templateUrl: './email-button.component.html',
  styleUrls: ['./email-button.component.scss']
})
export class EmailButtonComponent {
  @Input()
  block!: BlockBean;
  btnTxtFont: any;
  btnFontSize: any;

  constructor(private emailElementService: EmailElementService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.emailElementService.getElements().subscribe((elements) => {
    //   console.log(elements)
    // this.btnTxtFont = elements.general.font?.font?.fontFamily
    // this.btnFontSize = elements.general.fontSize?.size?.fontSize + 'px'
    // });
  }
  getSafeHtml(content: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }
}
