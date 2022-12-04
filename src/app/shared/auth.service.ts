import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: any;
  email: any;
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  getToken() {
    return this.token;
  }

  getEmail() {
    return this.email;
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (userCredential) => {
        this.token = userCredential.user?.refreshToken;
        this.email = userCredential.user?.email;
        localStorage.setItem('token', this.token);
        localStorage.setItem('email', this.email);
        this.router.navigate(['/admin-produk']);
        return userCredential.user?.refreshToken;
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  signup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (userCredential) => {
        alert('Registration successful');
        window.location.reload();
        return userCredential.user;
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  logout() {
    this.fireauth.signOut().then(
      () => {
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
