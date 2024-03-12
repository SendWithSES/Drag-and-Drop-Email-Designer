import { Component, Input } from '@angular/core';
import { BlockBean } from '../../models';

@Component({
  selector: 'app-email-divider',
  templateUrl: './email-divider.component.html',
  styleUrls: ['./email-divider.component.scss']
})
export class EmailDividerComponent {
  @Input()
  block!: BlockBean;
}
