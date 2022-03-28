import { Component, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  screenWidth = window.innerWidth;

  images: string[] = [
    '../../../assets/main-module/profile/man-no-images.svg',
    '../../../assets/main-module/profile/man-no-images.svg',
  ];

  videos: string[] = [
    '../../../assets/main-module/profile/man-no-images.svg',
    '../../../assets/main-module/profile/man-no-images.svg',
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.possitionAddPostButton();
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.possitionAddPostButton();
  }

  possitionAddPostButton(): void {
    const main = document.getElementsByTagName('main')[0];
    if (main) {
      const mainRightPossition = main.getBoundingClientRect().right;
      const bodyWidth = document.body.getBoundingClientRect().width;
      const addPostButton = <HTMLElement>(
        document.querySelector('.add-post-btn')
      );
      if (addPostButton) {
        addPostButton.style.right =
          (bodyWidth - mainRightPossition + 40).toString() + 'px';
      }
    }
  }

  openPopup(popup: HTMLElement) {
    popup.classList.add('open');
  }

  closePopup(popup: HTMLElement) {
    popup.classList.remove('open');
  }

  addMention() {
    const textArea = document.getElementById('post-text');
    if (textArea) textArea.innerText = textArea.innerText + '@';
  }

  addVideos($event: any) {}

  addImages($event: any) {
    console.log($event.target.files);
  }

  post() {}
}
