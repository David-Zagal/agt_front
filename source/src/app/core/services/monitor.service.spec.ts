import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MonitorService } from './monitor.service';

describe('MonitorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: MonitorService = TestBed.get(MonitorService);
    expect(service).toBeTruthy();
  });
});
