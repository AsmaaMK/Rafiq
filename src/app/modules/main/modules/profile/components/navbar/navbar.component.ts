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

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {

  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.possitionIndicator(this.getActiveLinkElement(this.router.url));
  }


  ngAfterViewInit(): void {
    this.possitionIndicator(this.getActiveLinkElement(this.router.url));

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let currentRoute = event.url;
        let activeLinkElement = this.getActiveLinkElement(currentRoute);
        this.possitionIndicator(activeLinkElement);
      }
    });
  }

  getActiveLinkElement(currentRoute: string) {
    currentRoute = this.router.url.split('/')[4];
    const linksList = document.querySelectorAll('a[routerLinkActive="active-link"]');
    let activeLinkElement = null;

    linksList.forEach(link => {
      if (link.innerHTML.toLowerCase() === currentRoute) {
        activeLinkElement = link.parentElement;
      }
    });

    return activeLinkElement;
  }

  possitionIndicator(activeLink: HTMLElement | null): void {
    if (!activeLink) return;

    let activeLinkLeftPossition = activeLink.getBoundingClientRect().left;
    let activeLinkWidth = activeLink.getBoundingClientRect().width;
    let indicator = document.getElementById('active-link-indicator');

    if (indicator) {
      indicator.style.width = `${activeLinkWidth.toString()}px`;
      indicator.style.left = `${activeLinkLeftPossition.toString()}px`;
    }
  }

}
