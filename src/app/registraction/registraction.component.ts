import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth/auth.service';
import { User } from '../interface/user';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registraction',
  templateUrl: './registraction.component.html',
  styleUrls: ['./registraction.component.scss'],
})
export class RegistractionComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public token: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  get username() {
    return this.registerForm.controls['username'];
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  switchPanel() {
    const content = document.getElementById('content');
    const login = document.getElementById('login');
    const register = document.getElementById('register');

    login?.addEventListener('click', () => {
      content?.classList.remove('active');
    });

    register?.addEventListener('click', () => {
      content?.classList.add('active');
    });
  }

  submitRegister() {
    const postData = { ...this.registerForm.value };
    this.authService.saveUser(postData as User).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registered Successfully',
        });
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    );
  }

  submitLogin() {
    const email: string = this.loginForm.value.email || '';
    const password: string = this.loginForm.value.password || '';

    const userData: User = {
      email,
      password,
      username: '',
    };

    this.authService.login(userData).subscribe(
      (response) => {
        // console.log(response.data.message);
        console.log(response.data.token);
        this.token = response.data.token;
        if (response.data.message === 'Login Success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Success',
          });
          localStorage.setItem('token', this.token);
          this.router.navigate(['/home']);
        } else if (response.data.message === 'Password not match') {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Password not match',
          });
        } else if (response.data.message === 'Email not exits') {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Email not exits',
          });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to log in. Please try again.',
        });
      }
    );
  }
}
