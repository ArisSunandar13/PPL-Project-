import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { PassdataService } from '../shared/passdata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public produkActive = '';
  public promosiActive = '';
  public pembayaranActive = '';
  public isActive = '';

  constructor(private auth: AuthService, public passData: PassdataService) {}

  ngOnInit(): void {
    this.isActive = this.passData.catchData();
    if (this.isActive === 'produk') {
      this.produkActive = 'active';
      this.promosiActive = '';
      this.pembayaranActive = '';
    } else if (this.isActive === 'promosi') {
      this.produkActive = '';
      this.promosiActive = 'active';
      this.pembayaranActive = '';
    } else if (this.isActive === 'pembayaran') {
      this.produkActive = '';
      this.promosiActive = '';
      this.pembayaranActive = 'active';
    }
  }

  signout() {
    this.auth.logout();
  }
}
