import { TestBed } from '@angular/core/testing';

import { TarjetaTipoService } from './tarjeta-tipo.service';

describe('TipoTarjetaService', () => {
  let service: TarjetaTipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetaTipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});