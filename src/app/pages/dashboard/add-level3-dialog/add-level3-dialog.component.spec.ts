import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevel3DialogComponent } from './add-level3-dialog.component';

describe('AddLevel3DialogComponent', () => {
  let component: AddLevel3DialogComponent;
  let fixture: ComponentFixture<AddLevel3DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLevel3DialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLevel3DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
