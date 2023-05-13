import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private _router: Router, private _location: Location) {}

  redirectTo(router: string) {
    this._router.navigate([`${router}`]);
  }

  back() {
    this._location.back();
  }
}
