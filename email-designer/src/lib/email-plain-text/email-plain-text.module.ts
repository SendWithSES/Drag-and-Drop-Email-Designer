import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlainTextComponent } from './plain-text/plain-text.component';
import { NgxSuneditorModule } from 'ngx-suneditor';



@NgModule({
  declarations: [
    PlainTextComponent
  ],
  imports: [
    CommonModule,
    NgxSuneditorModule,
  ],
  exports: [ PlainTextComponent ]
})
export class EmailPlainTextModule { }
