import { Injectable } from "@angular/core";
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Injectable({
    providedIn: "root"
})
export class AuthGuard {
    constructor(private router: Router, private authService: AuthService) {

    }
    canActivate: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        if (!this.authService.isTokenExpired()) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}