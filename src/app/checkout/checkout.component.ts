import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  iAm = 'checkout';
  myData: any[] = [];
  id: string | undefined;
  nama: string | undefined;
  stok: string | undefined;
  hargaAsal: string | undefined;
  hargaPromo: string | undefined;
  isLogin = false;
  total1 = 0;
  total2 = 0;
  totalDiskon = 0;

  namaPemesan = '';
  tanggalKunjungan = '';
  collection = 'checkout';
  message = '';

  constructor(
    public fileService: FileService,
    private fireStore: AngularFirestore
  ) {
    this.tampilData();
  }

  ngOnInit(): void {
    this.fileService.throwData(this.iAm);
  }

  pesan() {
    this.collection = this.namaPemesan;

    let dataupdate = {
      namaPemesan: this.namaPemesan,
      tanggalKunjungan: this.tanggalKunjungan,
    };

    this.myData.forEach((data) => {
      this.fireStore
        .collection(this.collection)
        .add(data)
        .then((res) => {
          console.log(res);
          this.fireStore
            .collection(this.collection)
            .doc(res.id)
            .update(dataupdate);
        });
      this.fireStore.collection('checkout').doc(data.id).delete();
    });

    this.fireStore.collection('dataPemesan').add(dataupdate);

    this.message =
      'Silahkan berkunjung ke toko kami kak ' +
      this.namaPemesan +
      '. Kami tunggu kunjungannya pada tanggal ' +
      this.tanggalKunjungan;
  }

  parse(data: any) {
    return parseInt(data);
  }

  tampilData() {
    let data = this.fireStore.collection(this.collection);
    let dataTerbaru = data.valueChanges({ idField: 'id' });
    dataTerbaru.subscribe((ss) => {
      this.myData = ss;
      this.myData.forEach((obj) => {
        this.total2 += obj.hargaBarangPromo;
        this.total1 += obj.hargaBarang;
        this.totalDiskon += obj.hargaSetelahPromo;
      });
    });
  }

  delete(produk: any) {
    this.total2 = 0;
    this.total1 = 0;
    this.totalDiskon = 0;
    this.fireStore.collection(this.collection).doc(produk.id).delete();
  }
}
