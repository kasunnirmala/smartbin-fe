import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevel2DialogComponent } from './add-level2-dialog.component';

describe('AddLevel2DialogComponent', () => {
  let component: AddLevel2DialogComponent;
  let fixture: ComponentFixture<AddLevel2DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLevel2DialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLevel2DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
