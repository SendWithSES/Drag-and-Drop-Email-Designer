import { Component, Input } from '@angular/core';
import { BlockBean } from '../../models';

@Component({
  selector: 'app-email-image',
  templateUrl: './email-image.component.html',
  styleUrls: ['./email-image.component.scss']
})
export class EmailImageComponent {
  @Input()
  block!: BlockBean;
}
