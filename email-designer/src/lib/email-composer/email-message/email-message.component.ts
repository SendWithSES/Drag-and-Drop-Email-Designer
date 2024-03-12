import { Component } from '@angular/core';
import { EmailMessageService } from './email-message.service';


@Component({
  selector: 'app-email-message',
  templateUrl: './email-message.component.html',
  styleUrls: ['./email-message.component.scss']
})
export class EmailMessageComponent {

  constructor(public message: EmailMessageService) { }

}
