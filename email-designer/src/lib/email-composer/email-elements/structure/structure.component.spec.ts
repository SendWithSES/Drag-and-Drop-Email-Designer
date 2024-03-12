import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureComponent } from './structure.component';

describe('StructureComponent', () => {
  let component: StructureComponent;
  let fixture: ComponentFixture<StructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StructureComponent]
    });
    fixture = TestBed.createComponent(StructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
