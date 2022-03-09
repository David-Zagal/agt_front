import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MtoUsuarioService } from './mto-usuario.service';


describe('MtoUsuarioService', () => {
  let service: MtoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MtoUsuarioService]
    });
    service = TestBed.inject(MtoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('comprobar setUser', () => {
   
  });

});
