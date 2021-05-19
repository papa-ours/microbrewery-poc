import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-can-rating',
  templateUrl: './can-rating.component.html',
  styleUrls: ['./can-rating.component.scss'],
})
export class CanRatingComponent implements AfterViewInit {
  
  public static readonly MAX_RATING = 5;

  @Input('canUid') public canUid: string;
  @ViewChild('starContainer') public starContainer: ElementRef;

  public rating: number;

  constructor(
    private gestureCtrl: GestureController,
  ) {
    this.rating = 0;
  }

  ngAfterViewInit() {
    // const gesture = this.gestureCtrl.create({
    //   el: this.starContainer.nativeElement,
    //   onMove: (detail) => { this.onMove(detail); },
    //   gestureName: 'swipe-rating',
    // });

    // gesture.enable();
  }

  private onMove(detail) {
    const type = detail.type;
    const currentX = detail.currentX;
    const deltaX = detail.deltaX;
    const velocityX = detail.velocityX;

    console.log(
      type,
      currentX,
      deltaX,
      velocityX,
    );
  }
  
  public getStars() {
    const stars = [];

    const FULL_STAR = 'star',
          HALF_STAR = 'star-half',
          EMPTY_STAR = 'star-outline';

    for (let i = 0; i < CanRatingComponent.MAX_RATING; i++) {
      if (this.rating - i === 0.5) {
        stars.push(HALF_STAR);
      } else if (i < this.rating) {
        stars.push(FULL_STAR);
      } else {
        stars.push(EMPTY_STAR);
      }
    }

    return stars;
  }

  public async setRating(rating: number): Promise<void> {
    this.rating = rating;
  }
}
