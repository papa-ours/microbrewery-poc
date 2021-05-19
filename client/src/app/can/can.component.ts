import { Component, Input, OnInit } from '@angular/core';
import { Can } from '../model/can';

@Component({
  selector: 'app-can',
  templateUrl: './can.component.html',
  styleUrls: ['./can.component.scss'],
})
export class CanComponent implements OnInit {
  
  @Input('can') public can: Can;

  constructor() { }

  ngOnInit() {}

}
