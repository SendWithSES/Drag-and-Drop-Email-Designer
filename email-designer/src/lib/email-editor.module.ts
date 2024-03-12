import { NgModule } from '@angular/core';
import { EmailEditorComponent } from './email-editor.component';
import { CommonModule } from '@angular/common';
import { EmailPlainTextModule } from './email-plain-text/email-plain-text.module';
import { EmailComposerModule } from './email-composer/email-composer.module';
import { EmailHtmlEditorModule } from './email-html-editor/email-html-editor.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    EmailEditorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    EmailPlainTextModule,
    EmailComposerModule,
    EmailHtmlEditorModule,
  ],
  exports: [
    EmailEditorComponent
  ]
})
export class EmailEditorModule { }
