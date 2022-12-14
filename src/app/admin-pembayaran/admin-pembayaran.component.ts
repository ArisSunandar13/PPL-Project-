import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FileService } from '../shared/file.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-admin-pembayaran',
  templateUrl: './admin-pembayaran.component.html',
  styleUrls: ['./admin-pembayaran.component.css'],
})
export class AdminPembayaranComponent implements OnInit {
  db = firebase.firestore();
  iAm = 'pembayaran';
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

  pemesan: any[] = [];
  pesanan = '';

  constructor(
    public fileService: FileService,
    private fireStore: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) {
    this.dataPemesan();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.isLogin = true;
    }
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    }
    this.fileService.throwData(this.iAm);
  }

  deletePemesan(data: any) {
    if (window.confirm('Yakin akan di Hapus?')) {
      this.fireStore.collection('dataPemesan').doc(data.id).delete();
      this.db
        .collection(data.namaPemesan)
        .get()
        .then((res: any) => {
          res.forEach((ress: any) => {
            this.fireStore.collection(data.namaPemesan).doc(ress.id).delete();
          });
        });
    }
    this.tampilData();
  }

  tampil(nama: any) {
    this.pesanan = nama;
    this.tampilData();
  }

  parse(data: any) {
    return parseInt(data);
  }

  dataPemesan() {
    let data = this.fireStore.collection('dataPemesan');
    let dataTerbaru = data.valueChanges({ idField: 'id' });
    dataTerbaru.subscribe((ss) => {
      this.pemesan = ss;
    });
  }

  tampilData() {
    let dataTerbaru = this.fireStore
      .collection(this.pesanan)
      .valueChanges({ idField: 'id' });
    dataTerbaru.subscribe((ss) => {
      this.myData = ss;
      this.total2 = 0;
      this.total1 = 0;
      this.totalDiskon = 0;
      this.myData.forEach((obj) => {
        this.total2 += obj.hargaBarangPromo;
        this.total1 += obj.hargaBarang;
        this.totalDiskon += obj.hargaSetelahPromo;
      });
    });
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

  delete(produk: any) {
    this.total2 = 0;
    this.total1 = 0;
    this.totalDiskon = 0;
    this.fireStore.collection(this.pesanan).doc(produk.id).delete();
  }
}
