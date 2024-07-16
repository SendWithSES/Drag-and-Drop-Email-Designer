import { ChangeDetectorRef, Component } from '@angular/core';
import { EmailElementService } from '../email-element.service';
import { EmailElements } from '../models';
import { sampleEmailData } from '../sample-data';

@Component({
  selector: 'app-email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.scss']
})
export class EmailEditorComponent {
  emailElements!: (EmailElements | any)
  data = sampleEmailData;
  selectedSIindex!: number;
  logoSelected!: boolean;
  //showLoader = false;
  loading = true;

  constructor(private emailElementService: EmailElementService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.emailElementService.emailElements$.subscribe((emailElements) => {
      if (emailElements) {
        this.emailElements = { ...emailElements };
        this.loading = false;
        this.cd.detectChanges();
      } else {
        this.emailElements = null;
        this.cd.detectChanges();
      }
    });
    this.emailElementService.selectedStructureIndex$.subscribe(i => {
      this.selectedSIindex = i;
    });
    this.emailElementService.structureAdded$.subscribe(i => {
      setTimeout(() => {
        this.emailElementService.resetBlockSelection(true)
        this.emailElementService.setSelectedStructureIndex(i);
        this.emailElementService.setSelectedStructureColumn(0)
        this.scrollIntoView(`structure-${i}`)
      }, 100);
    });
  }
  ngOnDestroy() {
    this.emailElementService.resetAllSelection();
  }
  setSelectedIndex(i: number, column: number) {
    this.emailElementService.setSelectedStructureIndex(i)
    this.emailElementService.setSelectedStructureColumn(column);
    if (!(this.emailElements.structures[i] &&
      this.emailElements.structures[i].blocks &&
      this.emailElements.structures[i].blocks[column] &&
      this.emailElements.structures[i].blocks[column].length)) {
      this.emailElementService.resetBlockSelection(true)
    }
    this.emailElementService.resetBlockSelection(true);
  }
  swapUpStucture(sIndex: number) {
    this.swapStucture(sIndex - 1, sIndex)
    this.emailElementService.setSelectedStructureIndex(sIndex - 1)
  }
  swapDownStucture(sIndex: number) {
    this.swapStucture(sIndex, sIndex + 1)
    this.emailElementService.setSelectedStructureIndex(sIndex + 1)
  }
  swapStucture(sIndex1: number, sIndex2: number, isUp = false) {
    this.emailElementService.swapStucture(sIndex1, sIndex2);
  }
  deleteStucture(sIndex: number) {
    this.emailElementService.deleteStucture(sIndex)
    this.emailElementService.resetAllSelection();
  }
  scrollIntoView(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
