import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-admin-pembayaran',
  templateUrl: './admin-pembayaran.component.html',
  styleUrls: ['./admin-pembayaran.component.css'],
})
export class AdminPembayaranComponent implements OnInit {
  iAm = 'pembayaran';
  constructor(public fileService: FileService) {}

  ngOnInit(): void {
    this.fileService.throwData(this.iAm);
  }
}
