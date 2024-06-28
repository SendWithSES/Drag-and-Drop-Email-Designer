import { Component, Input } from '@angular/core';
import { EmailElementService } from '../../email-element.service';
import { Logo } from '../../models';

@Component({
  selector: 'app-email-logo',
  templateUrl: './email-logo.component.html',
  styleUrls: ['./email-logo.component.scss']
})
export class EmailLogoComponent {
  @Input() logo!: Logo;
  logoSelected!: boolean;
  constructor(private es: EmailElementService) {

  }
  ngOnInit() {
    this.es.logoSelected$.subscribe(l => { this.logoSelected = l });
  }
  selectLogo() {
    this.es.resetBlockSelection()
    this.es.footerVisibility$.next(false)
    this.es.logoSelected$.next(true);
    this.es.elementClickedStatus.next(true);
  }
  clearLogo() {
    this.es.clearLogo()
  }
}
