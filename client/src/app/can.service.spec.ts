import { TestBed } from '@angular/core/testing';

import { CanService } from './can.service';

describe('CanService', () => {
  let service: CanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
