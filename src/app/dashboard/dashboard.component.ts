import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  iAm = 'dashboard';

  constructor(public fileService: FileService) {}

  ngOnInit(): void {
    this.fileService.throwData(this.iAm);
  }
}
