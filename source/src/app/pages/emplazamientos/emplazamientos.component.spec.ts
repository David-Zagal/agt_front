import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplazamientosComponent } from './emplazamientos.component';

describe('EmplazamientosComponent', () => {
  let component: EmplazamientosComponent;
  let fixture: ComponentFixture<EmplazamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplazamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplazamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});