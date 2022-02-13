import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevel1DialogComponent } from './add-level1-dialog.component';

describe('AddLevel1DialogComponent', () => {
  let component: AddLevel1DialogComponent;
  let fixture: ComponentFixture<AddLevel1DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLevel1DialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLevel1DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
