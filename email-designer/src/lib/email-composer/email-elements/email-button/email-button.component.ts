import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlockBean } from '../../models';

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

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getSafeHtml(content: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }
}
