import { Component, HostListener, Input } from '@angular/core';
import { BlockBean, BlockType } from '../../models';
import { EmailElementService } from '../../email-element.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  @Input() block!: BlockBean;
  @Input() bIndex!: number;
  @Input() sIndex!: number;
  @Input() cIndex!: number;
  @Input() firstIndex!: boolean;
  @Input() lastIndex!: boolean;

  selectedSIindex!: number;
  selectedCindex!: number;
  selectedBIndex!: number;
  selectedBType!: BlockType;
  destroy$ = new Subject<void>();
  mobileView!: boolean;

  constructor(private es: EmailElementService) { }

  ngOnInit() {
    this.es.selectedStructureIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe(i => this.selectedSIindex = i);
    this.es.selectedStructureColumn$
      .pipe(takeUntil(this.destroy$))
      .subscribe(i => this.selectedCindex = i);
    this.es.selectedBlockIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe(i => {
        this.selectedBIndex = i
      });
    this.es.selectedBlockType$
      .pipe(takeUntil(this.destroy$))
      .subscribe(b => this.selectedBType = b);
    this.es.blockAdded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((i) => {
        const selectedSIindex = this.selectedSIindex ? this.selectedSIindex : 0;
        const selectedCindex = this.selectedCindex ? this.selectedCindex : 0;

        setTimeout(() => {
          const block = this.es.getBlockDetails(selectedSIindex, selectedCindex, i);
          if (block) {
            this.es.setSelectedBlock(i, block.type, selectedSIindex, selectedCindex)
          }
          this.scrollIntoView(`block-${selectedSIindex}-${selectedCindex}-${i}`)
        }, 100);
      });

    this.detectMobileView();
  }
  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
  selectBlock(event: any) {
    this.es.setSelectedBlock(this.bIndex, this.block.type, this.sIndex, this.cIndex);
    this.es.elementClickedStatus.next(true);
    event.stopPropagation();
  }
  swapBlockInStucture(sIndex: number, cIndex: number, bIndex1: number, bIndex2: number) {
    this.es.swapBlockInStucture(sIndex, cIndex, bIndex1, bIndex2);
  }
  deleteBlockInStucture(sIndex: number, cIndex: number, bIndex: number) {
    this.es.deleteBlockInStucture(sIndex, cIndex, bIndex);
    this.es.resetBlockSelection(true);
  }
  scrollIntoView(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.detectMobileView();
  }
  detectMobileView(): any {
    const windowWidth = window.innerWidth;
    this.mobileView = (windowWidth <= 480 || /Mobi|Android/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent)) ? true : false;;
  }
}
