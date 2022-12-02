import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    this.tampilData()
  }

  ngOnInit(): void {
    this.fileService.throwData(this.iAm);
  }

  parse(data: any){
    console.log(data)
    return parseInt(data)
  }

  tampilData() {
    let data = this.firestore.collection('barang');
    let dataTerbaru = data.valueChanges({ idField: 'id' });
    dataTerbaru.subscribe((ss) => (this.myData = ss));
  }
}
