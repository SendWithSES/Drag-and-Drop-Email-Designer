import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockComponent } from './block.component';

describe('BlockComponent', () => {
  let component: BlockComponent;
  let fixture: ComponentFixture<BlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockComponent]
    });
    fixture = TestBed.createComponent(BlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
