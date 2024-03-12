import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-editor-html',
  templateUrl: './editor-html.component.html',
  styleUrls: ['./editor-html.component.scss']
})
export class EditorHtmlComponent {
  editorOptions = { automaticLayout: true, theme: 'vs-dark', language: 'html' };

  options = {
    theme: 'vs-dark'
  };

  @Input() code!: string;
  @Output() codeChangeEvent = new EventEmitter<string>();
  @Output() codeUpdated = new EventEmitter<boolean>();
  editorChange() {
    this.codeChangeEvent.emit(this.code);
    this.codeUpdated.emit(true)
  }

  ngOnInit() {
    this.codeChangeEvent.emit(this.code);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['code'] && changes['code'].currentValue) {
      this.codeUpdated.emit(false)
    }
  }
  monacoInit(event: any) {
    /*  console.log(event, 'monacoInit')
     if (event) {
       event.onDidChangeContent = (event2: any) => {
         console.log(event2, 'monacoInit onDidChangeContent')
       }
       event.onKeyUp = (event3: any) => {
         console.log(event3, 'monacoInit onKeyUp')
       }
       //onDidChangeModel
     } */

  }
}
