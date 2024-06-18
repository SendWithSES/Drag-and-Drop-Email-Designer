import { Component, Input } from '@angular/core';
import { BlockBean } from '../../models';
import { ConstantsData } from '../../constants';

@Component({
  selector: 'app-email-video',
  templateUrl: './email-video.component.html',
  styleUrls: ['./email-video.component.scss']
})
export class EmailVideoComponent {
  @Input() block!: BlockBean;
}
