import { TestBed } from '@angular/core/testing';

import { PassdataService } from './passdata.service';

describe('PassdataService', () => {
  let service: PassdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
