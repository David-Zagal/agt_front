import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaModeloComponent } from './tarjeta-modelo.component';

describe('TarjetaModeloComponent', () => {
  let component: TarjetaModeloComponent;
  let fixture: ComponentFixture<TarjetaModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaModeloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});