import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'profile-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  username = this.tokenStorageService.getUsername();

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.possitionIndicatorOnActiveLinkElement();
  }

  ngAfterViewInit(): void {
    this.possitionIndicatorOnActiveLinkElement();
  }

  /**
   * 1- Get the current route
   * 2- Search for the <a> with this route
   * 3- Possition the indicator below it
   * 
   * the current route must be ==> /app/profile/:username/{{section}}
   * so after spliting it ==> ['', 'app', 'profile', :username, {{section}}]
   * index 4 of the route is the innerHTML of the anchor tag
   */
  possitionIndicatorOnActiveLinkElement(): void {
    const currentRoute = this.router.url.split('/')[4];
    const linksList = document.querySelectorAll('a[routerLinkActive="active-link"]');
    let activeLinkElement = null;

    linksList.forEach(link => {
      if (link.innerHTML.toLowerCase() === currentRoute) {
        activeLinkElement = link;
      }
    });

    this.possitionIndicator(activeLinkElement);
  }


  /**
   * function that take the active link as an argument and possition the indicatior below it
   * by giving it left possition
   * left possion of the indicator = left possion of the active link - left possition of the navbar
   * @param activeLink 
   */
  possitionIndicator(activeLink: HTMLElement | null): void {
    if (!activeLink) return;

    let activeLinkLeftPossition = activeLink.getBoundingClientRect().left;
    let activeLinkWidth = activeLink.getBoundingClientRect().width;
    let indicator = document.getElementById('active-link-indicator');
    let navbar = document.getElementById('profile-navbar');

    if (indicator && navbar) {
      let navbarLeftPossition = navbar.getBoundingClientRect().left;
      indicator.style.width = `${activeLinkWidth.toString()}px`;
      indicator.style.left = `${(activeLinkLeftPossition - navbarLeftPossition).toString()}px`;
    }
  }
}
