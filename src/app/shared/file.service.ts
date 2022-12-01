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
    this.fireStore.collection('/upload').add(fileMeta);
  }

  getAllFiles() {
    return this.fireStore.collection('/upload').snapshotChanges();
  }

  deleteFile(fileMeta: any) {
    this.fireStore.collection('/upload').doc(fileMeta.fotoId).delete();
    this.fireStorage.ref('/uploads/' + fileMeta.fotoName).delete();
  }
}
