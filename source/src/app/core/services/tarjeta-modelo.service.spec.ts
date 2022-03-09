import { TestBed } from '@angular/core/testing';

import { TarjetaModeloService } from './tarjeta-modelo.service';

describe('TarjetaModeloService', () => {
  let service: TarjetaModeloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetaModeloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
