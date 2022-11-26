import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (userCredential) => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['admin-produk']);
        return userCredential.user;
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
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
