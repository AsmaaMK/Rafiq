import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() postMedia: string[] = [];
  @Input() postId = '';
  
  indexOfCurrentMedia = 0;
  numberOfMedia!: number;

  slider = document.getElementById(`slider-${this.postId}`);
  sliderWidth = 0;

  constructor() {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.setSliderWidth();
  }

  setSliderWidth() {
    this.numberOfMedia = this.postMedia.length;
    this.slider = document.getElementById(`slider-${this.postId}`);

    const widthOfParent =
      this.slider?.parentElement?.getBoundingClientRect().width;

    if (widthOfParent && this.slider) {
      this.sliderWidth = widthOfParent * this.numberOfMedia;
      this.slider.style.width = this.sliderWidth.toString() + 'px';

      const listOfPostMedia = document.querySelectorAll<HTMLElement>(
        '.slider__post-media'
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
