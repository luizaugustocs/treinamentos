import { TestBed, async, inject } from '@angular/core/testing';

import { DogGuardGuard } from './cerberus.guard';

describe('DogGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DogGuardGuard]
    });
  });

  it('should ...', inject([DogGuardGuard], (guard: DogGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
