import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';
import { TaskResultComponent } from '../task-result/task-result.component';
import { CanRatingComponent } from '../can-rating/can-rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule
  ],
  declarations: [
    TaskPage,
    TaskResultComponent,
    CanRatingComponent,
  ]
})
export class TaskPageModule {}
