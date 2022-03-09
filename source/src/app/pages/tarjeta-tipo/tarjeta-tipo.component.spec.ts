import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaTipoComponent } from './tarjeta-tipo.component';

describe('TarjetaTipoComponent', () => {
  let component: TarjetaTipoComponent;
  let fixture: ComponentFixture<TarjetaTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});