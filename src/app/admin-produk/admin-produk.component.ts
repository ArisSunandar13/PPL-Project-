import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FileMetadata } from '../model/file-metadata';
import { AuthService } from '../shared/auth.service';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-admin-produk',
  templateUrl: './admin-produk.component.html',
  styleUrls: ['./admin-produk.component.css'],
})
export class AdminProdukComponent implements OnInit {
  iAm = 'produk';
  myData: any[] = [];
  id: string | undefined;
  nama: string | undefined;
  stok: string | undefined;
  harga: string | undefined;
  isEdit: boolean | undefined;
  isUpload = false;
  isSimpan = false;
  tempId: any;
  afterUpload = '';
  isLogin = false;
  namaFile = '';

  selectedFiles!: FileList;
  currentFileUpload!: FileMetadata;
  listOfFiles: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private fileService: FileService,
    private fireStorage: AngularFireStorage,
    private router: Router,
    private fireStore: AngularFirestore
  ) {
    this.tampilData();
  }
  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.isLogin = true;
    } else {
      this.router.navigate(['/login']);
    }
    this.fileService.throwData(this.iAm);
    this.getAllFile();
  }

  selectFile(event: any) {
    this.isUpload = true;
    this.selectedFiles = event.target.files;
    console.log(this.afterUpload);
    this.uploadFile();
  }
  uploadFile() {
    this.currentFileUpload = new FileMetadata(this.selectedFiles[0]);
    console.log(this.nama);
    console.log(this.currentFileUpload.file.name);
    this.namaFile = this.currentFileUpload.file.name;
    const path =
      'fotoProdukStorage/' + (this.nama + this.currentFileUpload.file.name);
    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadLink) => {
            this.currentFileUpload.url = downloadLink;
            this.currentFileUpload.size = this.currentFileUpload.file.size;
            this.currentFileUpload.name =
              this.nama + this.currentFileUpload.file.name;

            this.fileService.saveMetaDataOfFile(this.currentFileUpload);
            this.isSimpan = true;
            this.isUpload = false;
            console.log(this.afterUpload);
            this.afterUpload = '';
            this.ngOnInit();
          });
        })
      )
      .subscribe(
        (res) => {
          return res;
        },
        (err) => {
          console.log('Error occured');
        }
      );
  }
  getAllFile() {
    this.fileService.getAllFiles().subscribe(
      (res) => {
        this.listOfFiles = res.map((e: any) => {
          let data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          this.tempId = data;
          return data;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  tampilData() {
    let data = this.fileService.tampilData();
    let dataTerbaru = data.valueChanges({ idField: 'id' });
    dataTerbaru.subscribe((ss) => (this.myData = ss));
    this.isEdit = false;
  }

  simpan() {
    let data = {
      namaBarang: this.nama,
      stokBarang: this.stok,
      hargaBarang: this.harga,
      fotoId: this.tempId.id,
      fotoName: this.currentFileUpload.name,
      fotoUrl: this.currentFileUpload.url,
    };
    console.log(data);
    this.fileService
      .simpanData(data)
      .then((res) => {
        this.isSimpan = false;
        this.tampilData();
        this.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getEdit(arr: {
    id: string | undefined;
    namaBarang: string | undefined;
    stokBarang: string | undefined;
    hargaBarang: string | undefined;
  }) {
    this.isEdit = true;
    this.id = arr.id;
    this.nama = arr.namaBarang;
    this.stok = arr.stokBarang;
    this.harga = arr.hargaBarang;
  }

  edit() {
    let data = {
      namaBarang: this.nama,
      stokBarang: this.stok,
      hargaBarang: this.harga,
    };
    this.fileService
      .updateData(this.id, data)
      .then((res) => {
        console.log(res);
        this.tampilData();
        this.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  delete(data: any) {
    console.log(data);
    if (
      window.confirm('Are you sure you want to delete ' + data.namaBarang + '?')
    ) {
      this.fileService.deleteData(data);
      this.ngOnInit();
    } else {
      this.ngOnInit();
    }
  }

  reset() {
    this.isEdit = false;
    this.nama = '';
    this.stok = '';
    this.harga = '';
  }
}
