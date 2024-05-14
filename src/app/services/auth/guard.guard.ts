import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService để kiểm tra trạng thái đăng nhập

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Kiểm tra trạng thái đăng nhập sử dụng AuthService
    if (this.authService.isAuthenticated()) {
      return true; // Cho phép truy cập
    } else {
      // Không đăng nhập, chuyển hướng đến trang đăng nhập
      this.router.navigate(['/login']);
      return false; // Ngăn chặn truy cập
    }
  }
}
