import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-admin-promosi',
  templateUrl: './admin-promosi.component.html',
  styleUrls: ['./admin-promosi.component.css'],
})
export class AdminPromosiComponent implements OnInit {
  iAm = 'promosi';
  constructor(public fileService: FileService) {}

  ngOnInit(): void {
    this.fileService.throwData(this.iAm);
  }
}
