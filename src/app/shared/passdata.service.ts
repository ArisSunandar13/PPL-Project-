import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PassdataService {
  iAmIs = '';
  constructor() {}

  throwData(whoSend: string) {
    this.iAmIs = whoSend;
  }

  catchData() {
    return this.iAmIs;
  }
}
