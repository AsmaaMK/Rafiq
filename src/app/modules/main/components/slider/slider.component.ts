import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() postImages: string[] = [];
  @Input() postId!: string;
  @Input() postType: 'post' | 'shared-post' | 'share-post-popup' = 'post';

  indexOfCurrentMedia = 0;
  numberOfMedia!: number;

  sliderId = `slider-${this.postType}-${this.postId}`;
  slider = document.getElementById(this.sliderId);

  sliderWidth = 0;
  ngOnInitCount = 0;
  ngCheckedCount = 0;

  constructor() {
  }

  ngOnInit() {
    console.log(this.sliderId, 'ngOnInit: ', ++this.ngOnInitCount);
    this.setSliderWidth();
  }

  ngAfterViewChecked() {
    console.log(this.sliderId, 'ngAfterViewChecked: ', ++this.ngCheckedCount);
    this.setSliderWidth();
  }

  setSliderWidth() {
    this.sliderId = `slider-${this.postType}-${this.postId}`;
    this.slider = document.getElementById(this.sliderId);
    this.numberOfMedia = this.postImages.length;

    const widthOfParent =
      this.slider?.parentElement?.getBoundingClientRect().width;

    if (widthOfParent && this.slider) {
      this.sliderWidth = widthOfParent * this.numberOfMedia;
      this.slider.style.width = this.sliderWidth.toString() + 'px';

      const listOfPostMedia = document.querySelectorAll<HTMLElement>(
        `.${this.sliderId}__post-media`
      );

      listOfPostMedia.forEach((postMedia) => {
        let margin: any = getComputedStyle(postMedia).marginLeft;
        margin = margin.slice(0, margin.indexOf('px'));

        postMedia.style.width =
          (this.sliderWidth / this.numberOfMedia - margin * 2).toString() +
          'px';
      });
    }
  }

  moveToPreviousMedia(): void {
    if (this.indexOfCurrentMedia > 0) {
      this.indexOfCurrentMedia--;
      const translate =
        (this.sliderWidth / this.numberOfMedia) * this.indexOfCurrentMedia;

      if (this.slider)
        this.slider.style.transform = `translate(${-translate}px)`;
    }
  }

  moveToNextMedia(): void {
    if (this.indexOfCurrentMedia < this.numberOfMedia - 1) {
      this.indexOfCurrentMedia++;
      const translate =
        (this.sliderWidth / this.numberOfMedia) * this.indexOfCurrentMedia;

      if (this.slider)
        this.slider.style.transform = `translate(${-translate}px)`;
    }
  }
}
