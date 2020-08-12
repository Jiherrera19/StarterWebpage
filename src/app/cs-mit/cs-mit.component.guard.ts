import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class MobileGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate() {

    if (window.innerWidth >= 768) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}

@Injectable()
export class DesktopGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate() {

    if (window.innerWidth < 768) {
      this.router.navigate(['cs-mit/m/']);
      return false;
    }

    return true;
  }
}