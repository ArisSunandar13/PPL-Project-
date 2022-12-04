import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  user: any;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/admin-produk'])
    }
  }
  login() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    } else if (this.password == '') {
      alert('Please enter password');
      return;
    } else {
      this.user = this.auth.login(this.email, this.password);
    }
  }
  signup() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    } else if (this.password == '') {
      alert('Please enter password');
      return;
    } else {
      this.user = this.auth.signup(this.email, this.password);
    }
  }
}
