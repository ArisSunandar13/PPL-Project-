import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  iAm = 'about-us';

  constructor(public fileService: FileService) {}

  ngOnInit(): void {
    this.fileService.throwData(this.iAm);
  }
}
