import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Can } from '../model/can';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  public cans: Can[];

  public constructor(
    public router: Router,
  ) {
    this.cans = [];
  }

  public ngOnInit() {
  }

  public async goToCamera() {
    await this.router.navigate(['camera']);
  }

}
