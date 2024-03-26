import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { articlesGuard } from './articles.guard';

describe('articlesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => articlesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
