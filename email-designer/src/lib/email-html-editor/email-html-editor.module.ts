import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { HtmlEditorSanitizePipe } from "./sanitize.pipe";
import { EditorHtmlComponent } from './editor-html/editor-html.component';
import { EmailHtmlEditorComponent } from './email-html-editor/email-html-editor.component';
import { EditorHtmlOutputViewComponent } from './editor-html-output-view/editor-html-output-view.component';


@NgModule({
  declarations: [
    EmailHtmlEditorComponent,
    EditorHtmlComponent,
    EditorHtmlOutputViewComponent,
    HtmlEditorSanitizePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule,
  ],
  exports: [
    EmailHtmlEditorComponent
  ]
})

export class EmailHtmlEditorModule { }
