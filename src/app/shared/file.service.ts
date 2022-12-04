import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetadata } from '../model/file-metadata';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  iAmIs = '';

  constructor(
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {}

  throwData(whoSend: string) {
    this.iAmIs = whoSend;
  }

  catchData() {
    return this.iAmIs;
  }

  saveMetaDataOfFile(fileObj: FileMetadata) {
    const fileMeta = {
      id: '',
      name: fileObj.name,
      url: fileObj.url,
      size: fileObj.size,
    };

    fileMeta.id = this.fireStore.createId();
    this.fireStore.collection('metadataFotoProdukStorage').add(fileMeta);
  }

  simpanData(data: any) {
    return this.fireStore.collection('produk').add(data);
  }

  updateData(id: any, data: any) {
    return this.fireStore.collection('produk').doc(id).update(data);
  }

  getAllFiles() {
    return this.fireStore.collection('metadataFotoProdukStorage').snapshotChanges();
  }

  tampilData() {
    return this.fireStore.collection('produk');
  }

  deleteData(data: any) {
    this.fireStore.collection('metadataFotoProdukStorage').doc(data.id).delete();
    this.fireStorage.ref('/fotoProdukStorage/' + data.fotoName).delete();
    this.fireStore.collection('produk').doc(data.id).delete();
  }
}
