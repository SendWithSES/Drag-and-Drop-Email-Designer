import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailEditorComponent } from './email-editor/email-editor.component';
import { EmailToolbarComponent } from './email-toolbar/email-toolbar.component';
import { EmailPreviewComponent } from './email-preview/email-preview.component';
import { TwoColumnComponent } from './email-elements/two-column/two-column.component';
import { OneColumnComponent } from './email-elements/one-column/one-column.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailComposerContainerComponent } from './email-composer-container/email-composer-container.component';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { StructureComponent } from './email-elements/structure/structure.component';
import { BlockComponent } from './email-elements/block/block.component';
import { EmailTextComponent } from './email-elements/email-text/email-text.component';
import { EmailBodyComponent } from './email-elements/email-body/email-body.component';
import { EmailImageComponent } from './email-elements/email-image/email-image.component';
import { EmailVideoComponent } from './email-elements/email-video/email-video.component';
import { EmailButtonComponent } from './email-elements/email-button/email-button.component';
import { EmailDividerComponent } from './email-elements/email-divider/email-divider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailLogoComponent } from './email-elements/email-logo/email-logo.component';
import { EmailFooterComponent } from './email-elements/email-footer/email-footer.component';
import { EmailLoaderComponent } from './email-loader/email-loader.component'
import { EmailMessageComponent } from './email-message/email-message.component';
import { EmailMessageService } from './email-message/email-message.service';
import { EmailElementService } from './email-element.service';
import { EmailContentEditorComponent } from './email-content-editor/email-content-editor.component';
import { NgxSuneditorModule } from 'ngx-sendune-editor';
import { SanitizePipe } from './sanitize.pipe';
import { EmailToolbarButtonComponent } from './email-toolbar-button/email-toolbar-button.component';
import { EmailToolbarFooterComponent } from './email-toolbar-footer/email-toolbar-footer.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    EmailEditorComponent,
    EmailToolbarComponent,
    EmailPreviewComponent,
    TwoColumnComponent,
    OneColumnComponent,
    EmailComposerContainerComponent,
    StructureComponent,
    BlockComponent,
    EmailTextComponent,
    EmailBodyComponent,
    EmailImageComponent,
    EmailVideoComponent,
    EmailButtonComponent,
    EmailDividerComponent,
    // EmailContentComponent,
    EmailLogoComponent,
    EmailFooterComponent,
    EmailLoaderComponent,
    EmailMessageComponent,
    EmailContentEditorComponent,
    SanitizePipe,
    EmailToolbarFooterComponent,
    EmailToolbarButtonComponent,
  ],
  providers: [
    EmailMessageService,
    EmailElementService
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgxSuneditorModule,
    NgbTooltipModule,
  ],
  exports: [
    EmailComposerContainerComponent,
    EmailToolbarComponent,
    EmailEditorComponent,
    EmailPreviewComponent

  ]
})
export class EmailComposerModule { }
