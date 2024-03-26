import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';

Injectable({
  providedIn: 'root',
});
export const authGuard: CanActivateFn = (next, state): Observable<boolean> => {
  if (checkLocalStorage()) {
    if (state.url == '/auth/login') {
      window.location.href = '/home';
    }
    return of(true);
  } else {
    window.location.href = '/auth/login';
    return of(false);
  }
};

// export const articlesGuardChild: CanActivateChildFn = (
//   childRoute,
//   state
// ): Observable<boolean> => {
//   const authService = inject(AuthService);
//   const targetSlug = childRoute.params['slug'];
//   if (!targetSlug) {s
//     return of(false);
//   }
//   return authService.currentUser.pipe(
//     map((user) => user.articles.includes(targetSlug))
//   );
// };

// export const articlesGuardMatch: CanMatchFn = (
//   next,
//   state
// ): Observable<boolean> => {
//   const authService = inject(AuthService);
//   // next.data
//   return authService.currentUser.pipe(map((user) => !!user));
// };

export function checkLocalStorage(): boolean {
  const isLoggedIn = !!localStorage.getItem('user');
  return isLoggedIn;
}
