import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutService } from './layout.service';
import { RouteStateService } from './route-state.service';

describe('LayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      TranslateModule.forRoot(),
      ]
  }));

  it('should be created', () => {
    const service: LayoutService = TestBed.get(LayoutService);
    expect(service).toBeTruthy();
  });
});
