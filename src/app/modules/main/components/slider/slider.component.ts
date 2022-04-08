import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() postMedia: string[] = [
    '../../../../../assets/main-module/post-images/10fd60e3ef81dcd4c3029c86056b4f24.jpg',
    '../../../../../assets/main-module/post-images/171885606_975972776140732_6446233969730968789_n.jpg',
    '../../../../../assets/main-module/post-images/Albania2.png',
    '../../../../../assets/main-module/post-images/dan-asaki-wC_YNVgIRdA-unsplash.jpg',
  ];
  indexOfCurrentMedia = 0;
  numberOfMedia!: number;

  slider = document.getElementById('slider');
  sliderWidth = 0;

  constructor() {}

  ngOnInit() {
    this.numberOfMedia = this.postMedia.length;
    this.slider = document.getElementById('slider');

    const widthOfParent =
      this.slider?.parentElement?.getBoundingClientRect().width;

    if (widthOfParent && this.slider) {
      this.sliderWidth = widthOfParent * this.numberOfMedia;
      this.slider.style.width = this.sliderWidth.toString() + 'px';

      const listOfPostMedia = document.querySelectorAll<HTMLElement>(
        '.slider__post-media'
      );

      console.log(listOfPostMedia)

      listOfPostMedia.forEach((postMedia) => {
        postMedia.style.width =
          (this.sliderWidth / this.numberOfMedia - 144).toString() + 'px'; /// 144 = 2 * controlerSize = 2 * 72
        
        console.log(postMedia.style.width);
      });
    }
  }

  moveToPreviousMedia(): void {
    // console.log('media: ', this.numberOfMedia);
    if (this.indexOfCurrentMedia > 0) {
      this.indexOfCurrentMedia--;
      console.log(this.indexOfCurrentMedia);
      const translate =
        (this.sliderWidth / this.numberOfMedia) * this.indexOfCurrentMedia;
      console.log('trans: ', translate);
      console.log(this.slider);
      if (this.slider)
        this.slider.style.transform = `translate(${-translate}px)`;
    }
  }

  moveToNextMedia(): void {
    // console.log('media: ', this.numberOfMedia);
    if (this.indexOfCurrentMedia < this.numberOfMedia - 1) {
      this.indexOfCurrentMedia++;
      console.log(this.indexOfCurrentMedia);
      const translate =
        (this.sliderWidth / this.numberOfMedia) * this.indexOfCurrentMedia;
      console.log('trans: ', translate);

      console.log(this.slider);
      if (this.slider)
        this.slider.style.transform = `translate(${-translate}px)`;
    }
  }
}
