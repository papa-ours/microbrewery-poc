import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from './constants';
import { Can } from './model/can';
import { Detection } from './model/detection';

export interface CanResult {
  can: Can,
  detection: Detection,
  image: string,
}

export interface Task {
  image: string,
  results: CanResult[],
  state: string,
}

@Injectable({
  providedIn: 'root'
})
export class CanService {

  public constructor(private http: HttpClient) { }

  public async createTask(imageData: string): Promise<string> {
    const response: any = await this.http.post<any>(`${SERVER_URL}task`, {
      image: imageData,
    }).toPromise();

    return response.task_uid;
  }

  public async getTask(taskUid: string): Promise<Task> {
    return this.http.get<Task>(`${SERVER_URL}task/${taskUid}`).toPromise();
  }
}
