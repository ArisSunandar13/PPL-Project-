import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../shared/passdata.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  iAm = 'about-us';

  constructor(public passData: PassdataService) {}

  ngOnInit(): void {
    this.passData.throwData(this.iAm);
  }
}
