import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterType } from 'src/app/shared/models/toaster-status';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { CityInfo } from '../../models/city';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-header',
  templateUrl: './city-header.component.html',
  styleUrls: ['./city-header.component.scss'],
})
export class CityHeaderComponent implements OnInit {
  showToast = false;
  toastStatus: ToasterType = 'error';
  toastMessage = '';
  isLoved = false;

  cityInfo!: CityInfo;
  cityId!: string;
  isCityAdmin = true;

  constructor(private cityInfoService: CityService, private route: Router) {}

  ngOnInit(): void {
    this.getCityInfo();
  }

  ngAfterViewChecked() {
    this.setCoverHeight();
  }

  getCityInfo() {
    this.cityId = this.route.url.split('/')[3];
    this.cityInfoService
      .getCityInfo(this.cityId)
      .subscribe((res) => (this.cityInfo = res));
  }

  setCoverHeight() {
    const cityCoverHeight = document
      .getElementById('city-cover')
      ?.getBoundingClientRect().height;
    const cityHeader = document.querySelector<HTMLElement>('.city-header');
    if (cityCoverHeight && cityHeader) {
      cityHeader.style.paddingTop = (cityCoverHeight * 0.75).toString() + 'px';
    }
  }

  followOrUnfollow(icon: HTMLElement) {
    icon.classList.toggle('loved');
    this.isLoved ? this.unfollow() : this.follow();
  }

  follow() {
    // this.followingService.follow(this.urlUserName).subscribe(
    //   (res) => {
    //     this.toastMessage = res.results.message;
    //     this.toastStatus = 'success';
    //     this.showToast = true;
    //     this.isFollowing.next(true);
    //   },
    //   (err) => {
    //     this.toastMessage = err.error.error.message;
    //     this.toastStatus = 'error';
    //     this.showToast = true;
    //   }
    // );
  }

  unfollow() {
    // this.followingService.unfollow(this.urlUserName).subscribe(
    //   (res) => {
    //     this.toastMessage = res.results.message;
    //     this.toastStatus = 'success';
    //     this.showToast = true;
    //     this.isFollowing.next(false);
    //   },
    //   (err) => {
    //     this.toastMessage = err.error.error.message;
    //     this.toastStatus = 'error';
    //     this.showToast = true;
    //   }
    // );
  }

  openPopup(popup: HTMLElement) {
    document.body.classList.add('popup-open');
    popup.classList.add('open');
  }

  closePopup(popup: HTMLElement) {
    document.body.classList.remove('popup-open');
    popup.classList.remove('open');
  }
}
