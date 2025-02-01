import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAccountModalPage } from './edit-account-modal.page';

describe('EditAccountModalPage', () => {
  let component: EditAccountModalPage;
  let fixture: ComponentFixture<EditAccountModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
