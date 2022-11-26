import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../shared/passdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  iAm = 'dashboard';

  constructor(public passData: PassdataService) {}

  ngOnInit(): void {
    this.passData.throwData(this.iAm);
  }
}
