import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileMetadata } from '../model/file-metadata';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  iAm = 'dashboard';
  myData: any[] = [];

  constructor(
    public fileService: FileService,
    private firestore: AngularFirestore
  ) {
    this.tampilData();
  }

  ngOnInit(): void {
    this.fileService.throwData(this.iAm);
  }

  parse(data: any) {
    return parseInt(data);
  }

  tampilData() {
    let data = this.fileService.tampilData();
    let dataTerbaru = data.valueChanges({ idField: 'id' });
    dataTerbaru.subscribe((ss) => (this.myData = ss));
  }

  fotoId = '';
  fotoName = '';
  fotoUrl = '';
  hargaBarang = 0;
  hargaBarangPromo = 0;
  setelahPromo = 0;
  id = '';
  namaBarang = '';
  stokBarang = 0;

  checkout(arr: {
    fotoId: '';
    fotoName: '';
    fotoUrl: '';
    hargaBarang: 0;
    hargaBarangPromo: 0;
    id: '';
    namaBarang: '';
    stokBarang: 0;
  }) {
    this.fotoId = arr.fotoId;
    this.fotoName = arr.fotoName;
    this.fotoUrl = arr.fotoUrl;
    this.hargaBarang = arr.hargaBarang;
    if (arr.hargaBarangPromo === undefined) {
      this.hargaBarangPromo = 0;
      this.setelahPromo = 0;
    } else {
      this.hargaBarangPromo = arr.hargaBarangPromo;
      this.setelahPromo = arr.hargaBarang - this.hargaBarangPromo;
    }
    this.id = arr.id;
    this.namaBarang = arr.namaBarang;
    this.stokBarang = arr.stokBarang;
    this.simpan();
  }

  simpan() {
    let data = {
      namaBarang: this.namaBarang,
      stokBarang: this.stokBarang,
      hargaBarang: this.hargaBarang,
      hargaBarangPromo: this.hargaBarangPromo,
      hargaSetelahPromo: this.setelahPromo,
      fotoId: this.fotoId,
      fotoName: this.fotoName,
      fotoUrl: this.fotoUrl,
    };
    console.log(data);
    this.firestore
      .collection('checkout')
      .add(data)
      .then()
      .catch((e) => {
        console.log(e);
      });
  }
}
