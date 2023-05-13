import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { RouterService } from '../router.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user!: User;
  constructor(
    private _fireAuth: AngularFireAuth,
    private _router: RouterService,
    private _tokenService: TokenService
  ) {}

  async loginWithGoogle() {
    return this._fireAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((u) => {
        this.getUserData(u);
        this._router.redirectTo('/admin');
      });
  }

  private async getUserData(user: firebase.default.auth.UserCredential) {
    this.user = {
      name: user?.user?.displayName,
      uid: user?.user?.uid,
      email: user?.user?.email,
      token: await user?.user.getIdToken().then(),
    };

    this._tokenService.setToken(this.user?.token);
  }

  logout() {
    this._fireAuth.signOut();
    this._tokenService.removeToken();
    this._router.redirectTo('/');
  }

  isAuthenticated() {
    return this._fireAuth.authState.pipe(map((res) => (res ? true : false)));
  }
}
