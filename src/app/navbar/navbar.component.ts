import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  public email = localStorage.getItem('email');
  public isActive = '';
  public produkActive = '';
  public promosiActive = '';
  public pembayaranActive = '';
  public dashboardActive = '';
  public checkoutActive = '';
  public aboutusActive = '';
  public menuAdmin = true;
  public menuAnon = true;

  constructor(private auth: AuthService, public fileService: FileService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.isLogin = true;
    }
    this.isActive = this.fileService.catchData();
    if (this.isLogin) {
      this.menuAdmin = true;
      this.menuAnon = false;
      if (this.isActive === 'produk') {
        this.produkActive = 'active';
        this.promosiActive = '';
        this.pembayaranActive = '';
        this.dashboardActive = '';
        this.checkoutActive = '';
        this.aboutusActive = '';
      } else if (this.isActive === 'promosi') {
        this.produkActive = '';
        this.promosiActive = 'active';
        this.pembayaranActive = '';
        this.dashboardActive = '';
        this.checkoutActive = '';
        this.aboutusActive = '';
      } else if (this.isActive === 'pembayaran') {
        this.produkActive = '';
        this.promosiActive = '';
        this.pembayaranActive = 'active';
        this.dashboardActive = '';
        this.checkoutActive = '';
        this.aboutusActive = '';
      } else if (this.isActive === 'dashboard') {
        this.produkActive = '';
        this.promosiActive = '';
        this.pembayaranActive = '';
        this.dashboardActive = '';
        this.aboutusActive = '';
        this.dashboardActive = 'active';
        this.checkoutActive = '';
        this.aboutusActive = '';
      } else if (this.isActive === 'about-us') {
        this.produkActive = '';
        this.promosiActive = '';
        this.pembayaranActive = '';
        this.dashboardActive = '';
        this.aboutusActive = '';
        this.dashboardActive = '';
        this.checkoutActive = '';
        this.aboutusActive = 'active';
      } else if (this.isActive === 'checkout') {
        this.produkActive = '';
        this.promosiActive = '';
        this.pembayaranActive = '';
        this.dashboardActive = '';
        this.aboutusActive = '';
        this.dashboardActive = '';
        this.checkoutActive = 'active';
        this.aboutusActive = '';
      }
    } else {
      this.menuAdmin = false;
      this.menuAnon = true;
      if (this.isActive === 'dashboard') {
        this.dashboardActive = 'active';
        this.aboutusActive = '';
      } else if (this.isActive === 'about-us') {
        this.dashboardActive = '';
        this.aboutusActive = 'active';
      } else if (this.isActive === 'checkout') {
        this.dashboardActive = '';
        this.aboutusActive = '';
        this.checkoutActive = 'active';
      }
    }
  }

  produk() {}

  signout() {
    this.auth.logout();
  }
}
