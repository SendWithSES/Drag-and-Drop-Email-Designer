import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }
  transform(v: any, type = 'url'): SafeHtml {
    if (type === 'html') {
      return this._sanitizer.bypassSecurityTrustHtml(v);
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(v);
  }

}
