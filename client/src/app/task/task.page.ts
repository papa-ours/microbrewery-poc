import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanService, Task } from '../can.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  public taskUid: string;
  public task: Task;
  public slideOptions: any;

  constructor(
    private route: ActivatedRoute,
    private canService: CanService,
  ) {
    this.taskUid = '';
    this.task = undefined;

    this.slideOptions = {
      initialSlide: 1,
      speed: 400,
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.taskUid = params['uid'];
      this.getTask();
    });
  }

  public async getTask(): Promise<void> {
    this.task = await this.canService.getTask(this.taskUid);
  }

}
