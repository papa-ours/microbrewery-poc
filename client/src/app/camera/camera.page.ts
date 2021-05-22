import { Component, OnInit } from '@angular/core';
import { Plugins, PermissionType } from '@capacitor/core';
import { Router } from '@angular/router';
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { CanService } from '../can.service';
const { CameraPreview, Permissions } = Plugins;

import '@capacitor-community/camera-preview';
import { ToastController } from '@ionic/angular';

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
    public toastController: ToastController,
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
    await Permissions.query({
      name: PermissionType.Camera,
    });
  }

  public async takePicture() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 80,
    };

    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    await this.sendPicture(result.value);
  }

  public async sendPicture(base64PictureData: string): Promise<void> {
    this.isLoading = true;
    const taskUid: string = await this.canService.createTask(base64PictureData);
    if (taskUid) {
      await this.router.navigate([`task/${taskUid}`]);
      this.isLoading = false;
    }
  }

  public async cancel(): Promise<void> {
    this.router.navigate(['tabs/home']);
  }

  public async chooseFile(): Promise<void> {
    const fileInput: HTMLInputElement = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.click();
    
    fileInput.addEventListener("input", async () => {
      const file: File = fileInput.files[0];
      if (!this.validateImage(file)) {
        return;
      }

      const dataUrl: string = await this.readFile(file);
      await this.sendPicture(dataUrl);
    });
  }

  public async readFile(file: File): Promise<string> {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.addEventListener("load", () => {
        resolve(reader.result as string);
      });
    });
  }

  public validateImage(file: any): boolean {
    if (!file.type.includes("image")) {
      this.showToast("Le fichier doit être une image");
      return false;
    }

    return true;
  }

  private async showToast(message: string): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastController.create({
      message: message,
      duration: 2200,
      position: 'bottom',
      color: 'danger',
    });

    toast.present();
  }

}
