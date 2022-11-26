import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../shared/passdata.service';

@Component({
  selector: 'app-admin-promosi',
  templateUrl: './admin-promosi.component.html',
  styleUrls: ['./admin-promosi.component.css'],
})
export class AdminPromosiComponent implements OnInit {
  iAm = 'promosi';
  constructor(public passData: PassdataService) {}

  ngOnInit(): void {
    this.passData.throwData(this.iAm);
  }
}
