import { UserDataService } from '../services/user-data.service';
import { DicodefNombrePipe } from './dicodef-nombre.pipe';

describe('DicodefNombrePipe', () => {
  it('create an instance', () => {
    const pipe = new DicodefNombrePipe();
    expect(pipe).toBeTruthy();
  });
});
