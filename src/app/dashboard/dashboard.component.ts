import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  navbar = true;

  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.newItemEvent.emit(this.navbar);
  }
}
