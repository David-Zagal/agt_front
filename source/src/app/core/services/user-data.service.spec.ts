import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UserDataService } from './user-data.service';


describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserDataService]
    });
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('comprobar setUser', () => {
    expect(service.user).toBeUndefined();
    service.setUser('usuario', 'password');
    const user = service.user;
    const password = service.password;
    expect(user).toEqual('usuario');
    expect(password).toEqual('password');
  });

});
