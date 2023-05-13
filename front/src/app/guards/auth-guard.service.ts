import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs';
import { RouterService } from '../shared/services/router.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private _authService: AuthService,
    private _routerService: RouterService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authService.isAuthenticated().pipe(
      tap((res) => {
        if (!res) this._routerService.redirectTo('/login');
      })
    );
  }
}
