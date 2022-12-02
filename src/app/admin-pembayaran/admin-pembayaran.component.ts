import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileMetadata } from '../model/file-metadata';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-admin-pembayaran',
  templateUrl: './admin-pembayaran.component.html',
  styleUrls: ['./admin-pembayaran.component.css'],
})
export class AdminPembayaranComponent implements OnInit {
  iAm = 'pembayaran';
  myData: any[] = [];
  id: string | undefined;
  nama: string | undefined;
  stok: string | undefined;
  hargaAsal: string | undefined;
  hargaPromo: string | undefined;

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
    console.log(data);
    return parseInt(data);
  }

  tampilData() {
    let data = this.firestore.collection('barang');
    let dataTerbaru = data.valueChanges({ idField: 'id' });
    dataTerbaru.subscribe((ss) => (this.myData = ss));
  }

  getEdit(arr: {
    id: string | undefined;
    namaBarang: string | undefined;
    stokBarang: string | undefined;
    hargaBarang: string | undefined;
    hargaBarangPromo: string | undefined;
  }) {
    this.id = arr.id;
    this.nama = arr.namaBarang;
    this.stok = arr.stokBarang;
    this.hargaAsal = arr.hargaBarang;
    this.hargaPromo = arr.hargaBarangPromo;
  }

  delete(arr: { id: string | undefined }, file: any) {
    console.log(file);
    this.deleteFile(file);
    this.firestore.collection('barang').doc(arr.id).delete();
    this.ngOnInit();
  }

  deleteFile(file: FileMetadata) {
    if (window.confirm('Are you sure you want to delete' + file.name + '?')) {
      this.fileService.deleteFile(file);
      this.ngOnInit();
    }
  }
}
