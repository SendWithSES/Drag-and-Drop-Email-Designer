import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Structure } from '../../models';
import { EmailElementService } from '../../email-element.service';

@Component({
  selector: 'app-one-column',
  templateUrl: './one-column.component.html',
  styleUrls: ['./one-column.component.scss']
})
export class OneColumnComponent {
  @Input() structure: Structure = new Structure({ type: "1", blocks: [] });
  @Input() sIndex!: number;

  @Output() oneClicked = new EventEmitter<void>();
  selectedSIindex!: number;
  selectedCindex!: number;
  constructor(private es: EmailElementService) {

  }
  ngOnInit() {
    this.es.selectedStructureIndex$.subscribe(i => this.selectedSIindex = i);
    this.es.selectedStructureColumn$.subscribe(i => this.selectedCindex = i);
  }
  oneColumClicked() {
    this.oneClicked.emit();
  }
}
