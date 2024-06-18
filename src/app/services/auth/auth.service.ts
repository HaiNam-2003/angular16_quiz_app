import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interface/user';
import { Observer, Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) {}

  isLoggedIn = false;

  // Phương thức kiểm tra trạng thái đăng nhập
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  saveUser(data: User): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      axios
        .post(`${this.url}/register`, data)
        .then((response: AxiosResponse<any>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  login(data: User): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      axios
        .post(`${this.url}/login`, data)
        .then((response: AxiosResponse<any>) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
      this.isLoggedIn = true;
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('data');
  }
}
