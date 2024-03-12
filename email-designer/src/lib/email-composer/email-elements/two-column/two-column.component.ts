import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Structure } from '../../models';
import { EmailElementService } from '../../email-element.service';

@Component({
  selector: 'app-two-column',
  templateUrl: './two-column.component.html',
  styleUrls: ['./two-column.component.scss']
})
export class TwoColumnComponent {
  @Input() structure: Structure = new Structure({ type: "2", blocks: [] });;
  @Input() sIndex!: number;
  @Output() twoClicked = new EventEmitter<number>();
  twoColumnClicked(column: number) {
    this.twoClicked.emit(column);
  }
  selectedSIindex!: number;
  selectedCIndex!: number;
  constructor(private es: EmailElementService) {

  }
  ngOnInit() {
    this.es.selectedStructureIndex$.subscribe(i => this.selectedSIindex = i);
    this.es.selectedStructureColumn$.subscribe(i => this.selectedCIndex = i);
  }
}
