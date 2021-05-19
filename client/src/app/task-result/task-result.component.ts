import { Component, Input, OnInit } from '@angular/core';
import { CanResult } from '../can.service';

@Component({
  selector: 'app-task-result',
  templateUrl: './task-result.component.html',
  styleUrls: ['./task-result.component.scss'],
})
export class TaskResultComponent implements OnInit {

  @Input('result') public taskResult: CanResult;
  @Input('index') public index: number;
  @Input('total') public total: number;

  public readonly typeLabels = {
    blonde: 'Blonde',
    ipa: 'IPA',
    ambree: 'Amber',
    sure: 'Sour',
    blanche: 'Blanche',
    rousse: 'Red',
    noire: 'Dark',
  }

  constructor() {}

  ngOnInit() {
  }

}
