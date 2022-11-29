import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { FileMetadata } from '../model/file-metadata';
import { FileService } from '../shared/file.service';
import { PassdataService } from '../shared/passdata.service';

@Component({
  selector: 'app-admin-produk',
  templateUrl: './admin-produk.component.html',
  styleUrls: ['./admin-produk.component.css'],
})
export class AdminProdukComponent implements OnInit {
  title = 'angular-firestore';
  myData: any[] = [];
  id: string | undefined;
  nama: string | undefined;
  stok: string | undefined;
  harga: string | undefined;
  iAm = 'produk';
  isEdit: boolean | undefined;

  selectedFiles!: FileList;
  currentFileUpload!: FileMetadata;
  // percentage: number = 0;
  listOfFiles: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    public passData: PassdataService,
    private fileService: FileService,
    private fireStorage: AngularFireStorage
  ) {
    this.tampilData();
  }
  ngOnInit(): void {
    this.passData.throwData(this.iAm);
    this.getAllFile();
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
  uploadFile() {
    this.currentFileUpload = new FileMetadata(this.selectedFiles[0]);
    const path = 'uploads/' + this.currentFileUpload.file.name;
    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadLink) => {
            this.currentFileUpload.url = downloadLink;
            this.currentFileUpload.size = this.currentFileUpload.file.size;
            this.currentFileUpload.name = this.currentFileUpload.file.name;

            this.fileService.saveMetaDataOfFile(this.currentFileUpload);
            this.ngOnInit();
          });
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log('Error occured');
        }
      );
  }
  getAllFile() {
    this.fileService.getAllFiles().subscribe(
      (res) => {
        console.log(res);
        this.listOfFiles = res.map((e) => {
          console.log(e.payload.doc.data());
          let data = e.payload.doc.data();
          // data = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteFile(file: FileMetadata) {
    if (window.confirm('Are you sure you want to delete' + file.name + '?')) {
      this.fileService.deleteFile(file);
      this.ngOnInit();
    }
  }

  tampilData() {
    let data = this.firestore.collection('barang');
    let dataTerbaru = data.valueChanges({ idField: 'id' });
    dataTerbaru.subscribe((ss) => (this.myData = ss));
    this.isEdit = false;
  }

  simpan() {
    let data = {
      namaBarang: this.nama,
      stokBarang: this.stok,
      hargaBarang: this.harga,
    };
    this.firestore
      .collection('barang')
      .add(data)
      .then((res) => {
        console.log(res);
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
    this.firestore
      .collection('barang')
      .doc(this.id)
      .update(data)
      .then((res) => {
        console.log(res);
        this.tampilData();
        this.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  delete(arr: { id: string | undefined }) {
    this.firestore
      .collection('barang')
      .doc(arr.id)
      .delete()
      .then((res) => {
        console.log(res);
        this.tampilData();
        this.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  reset() {
    this.isEdit = false;
    this.nama = '';
    this.stok = '';
    this.harga = '';
  }
}
