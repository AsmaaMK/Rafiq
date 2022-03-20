import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.possitionNavbar();
  }

  onScroll() {
    this.possitionNavbar();
  }

  ngAfterViewInit() {
    this.possitionNavbar();
  }
  
  /**
   * calculate the button offset of the card info and cover to possition the navbar dynamically
   * the calculation must be after the view init because the card height is not specified in css
   */
  possitionNavbar(): void {
    let profileCard = document.getElementById("profile-info-card");
    let profileCover = document.getElementById("profile-cover");
    let profileNav = document.getElementById("profile-navbar");

    let profileCardBottom = 0;
    let profileCoverBottom = 0;
    let profileNavMarginTop = 0;
    let navbarMarginTop = 0;

    if (profileCard && profileCover) {
      // profileCardBottom = profileCard.offsetHeight + profileCard.offsetTop;
      // profileCoverBottom = profileCover.offsetHeight + profileCover.offsetTop;
      profileCardBottom = profileCard.getBoundingClientRect().bottom;
      profileCoverBottom = profileCover.getBoundingClientRect().bottom;
    }

    if (profileCardBottom && profileCoverBottom) {
      profileNavMarginTop = profileCardBottom - profileCoverBottom;
    }

    if (profileNavMarginTop && profileNav) {
      navbarMarginTop = (profileNavMarginTop + 20);
      profileNav.style.marginTop = navbarMarginTop.toString() + 'px';
    }

    // const navbar = document.getElementById('profile-navbar');
    // const indicator = document.getElementById('indicator-wrapper');
    
    // if (indicator && navbar) {
    //   indicator.style.top = (navbar.getBoundingClientRect().bottom).toString() + 'px';
    
    //   // navbar.style.backgroundColor = 'blue';
    // }


  }
}