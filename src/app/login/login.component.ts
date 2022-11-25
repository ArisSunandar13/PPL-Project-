import { Component, OnInit } from '@angular/core';
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
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  login() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    } else if (this.password == '') {
      alert('Please enter password');
      return;
    } else {
      this.user = this.auth.login(this.email, this.password);
      console.log(this.user);
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
      console.log(this.user);
    }
  }
}
