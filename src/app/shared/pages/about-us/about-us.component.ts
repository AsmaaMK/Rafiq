import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  observer!: IntersectionObserver;

  constructor() {}

  ngOnInit(): void {
    this.initIntersectionObserver(null, )
  }

  showImage(div: any) {
    div.getElementsByClassName('content')[0].classList.add('show');
    div.getElementsByClassName('image')[0].classList.add('show');
  }

  initIntersectionObserver(root: HTMLElement | null) {
    let options = {
      root: root,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.showImage(entries[0].target);
      }
    }, options);

    const rows = document.getElementsByClassName('row');
    console.log(rows)
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      this.observer.observe(row);
    }
  }
}
