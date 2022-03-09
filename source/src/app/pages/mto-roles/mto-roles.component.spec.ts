import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtoRolesComponent } from './mto-roles.component';

describe('MtoRolesComponent', () => {
  let component: MtoRolesComponent;
  let fixture: ComponentFixture<MtoRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtoRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtoRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
