import { Component, OnInit } from '@angular/core';
import { Plugins, PermissionType } from '@capacitor/core';
import { Router } from '@angular/router';
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { CanService } from '../can.service';
const { CameraPreview, Permissions } = Plugins;

import '@capacitor-community/camera-preview';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  public isLoading: boolean;
  
  public constructor(
    public canService: CanService,
    public router: Router,
  ) {
    this.isLoading = false;
  }

  public ngOnInit() {
    this.openCamera();
  }

  public async openCamera(): Promise<void> {
    try {
      const cameraPreviewOptions: CameraPreviewOptions = {
        position: 'rear',
        parent: 'camera-preview',
        className: 'camera-preview',
        disableAudio: true,
        toBack: true,
        rotateWhenOrientationChanged: false,
      };
    
      await CameraPreview.start(cameraPreviewOptions);
    } catch (error) {
      this.requestCameraPermission();
    }
  }

  public async requestCameraPermission(): Promise<void> {
    Permissions.query({
      name: PermissionType.Camera,
    });
  }

  public async takePicture() {
    this.isLoading = true;
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 80,
    };

    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    const base64PictureData = result.value;
    
    const taskUid: string = await this.canService.createTask(base64PictureData);
    if (taskUid) {
      await this.router.navigate([`task/${taskUid}`]);
      this.isLoading = false;
    }
  }
}
