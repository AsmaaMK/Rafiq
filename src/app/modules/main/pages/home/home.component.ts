import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../shared/components/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private postService: PostService) {}

  posts!: string[];

  ngOnInit(): void {
    const splash = document.querySelector('.splash');
    setTimeout(() => {
      splash?.classList.add('fly');
    }, 1000);
    // const svg = document.getElementById('map-svg');
    // console.log(svg);
    
    // svg?.addEventListener('click', (event: any) => {
    //   if (event.target.nodeName === 'path') {
    //     const shape = event.target.parentNode;
    //     shape.classList.toggle('active');
    //   }
    // });
  }
}
