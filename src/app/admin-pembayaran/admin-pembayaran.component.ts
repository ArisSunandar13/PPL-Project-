import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../shared/passdata.service';

@Component({
  selector: 'app-admin-pembayaran',
  templateUrl: './admin-pembayaran.component.html',
  styleUrls: ['./admin-pembayaran.component.css'],
})
export class AdminPembayaranComponent implements OnInit {
  iAm = 'pembayaran';
  constructor(public passData: PassdataService) {}

  ngOnInit(): void {
    this.passData.throwData(this.iAm);
  }
}
