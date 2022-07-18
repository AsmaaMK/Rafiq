import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToasterType } from 'src/app/shared/models/toaster-status';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { EditInfo, SocialLinks, UserProfile } from '../../models/user-info';
import { EditInfoService } from '../../services/edit-info.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'profile-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
  seenPasswordImage = new BehaviorSubject(
    '../../../../../../../assets/auth-module/icons/Seen.svg'
  );

  countries = this.countriesService.getAllCountries();
  editInfoForm!: FormGroup;
  myInfo!: UserProfile;
  socialLinks: SocialLinks = {};
  updatedInfo: EditInfo = {};
  newPassword: string = '';

  editInfoShowToast = false;
  infoSuccess: ToasterType = 'error';
  infoMessage = '';

  editPasswordShowToast = false;
  passwordSuccess: ToasterType = 'error';
  passwordMessage = '';

  updated = false;

  constructor(
    private editInfoService: EditInfoService,
    private countriesService: CountriesService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInfo();
    this.formInit();
  }

  getInfo() {
    this.myInfo = this.userInfoService.myInfo.value;

    const socialLinks = this.myInfo.socialMedia;
    if (socialLinks)
      for (let link of socialLinks) {
        this.socialLinks[link.label] = link.userName;
      }
  }

  formInit() {
    this.editInfoForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(35),
        Validators.pattern('[a-zA-Z]+'),
      ]),
      lastName: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(35),
        Validators.pattern('[a-zA-Z]+'),
      ]),
      country: new FormControl(''),
      liveIn: new FormControl(''),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      youtube: new FormControl(''),
      tiktok: new FormControl(''),
    });

    this.firstName?.setValue(this.myInfo.firstName);
    this.lastName?.setValue(this.myInfo.lastName);
    this.dateOfBirth?.setValue(this.getTransformedDate());
    this.facebook?.setValue(this.socialLinks.facebook);
    this.instagram?.setValue(this.socialLinks.instagram);
    this.youtube?.setValue(this.socialLinks.youtube);
    this.tiktok?.setValue(this.socialLinks.tiktok);
  }

  getTransformedDate() {
    const dob = new Date(
      this.myInfo.dateOfBirth ? this.myInfo.dateOfBirth : ''
    );
    let day = dob.getDate().toString();
    let year = dob.getFullYear().toString();
    let month = (dob.getMonth() + 1).toString();
    if (day.length === 1) day = `0${day}`;
    if (month.length === 1) month = `0${month}`;
    return `${year}-${month}-${day}`;
  }

  editInfo(key: keyof EditInfo, value: any) {
    this.updatedInfo[key] = value;
    this.updated = true;
  }

  editLink(key: keyof SocialLinks, value: string) {
    this.socialLinks[key] = value;
    this.updated = true;
  }

  getUpdatedLinks() {
    const updatedLinks: { userName: string; label: string }[] = [];

    Object.entries(this.socialLinks).forEach(([key, value]) => {
      if (value)
        updatedLinks.push({
          userName: value,
          label: key,
        });
    });

    return updatedLinks;
  }

  editPassword(newPassword: string) {
    this.newPassword = newPassword;
  }

  editAllInfo() {
    const updatedLinks = this.getUpdatedLinks();
    this.updatedInfo.socialMedia = updatedLinks;

    if (this.updated) {
      this.updated = false;
      this.editInfoService.editInfo(this.updatedInfo).subscribe(
        (res) => {
          this.infoSuccess = 'success';
          this.infoMessage = res.results.message;
          this.editInfoShowToast = true;
          this.updatedInfo = {};
        },
        (err) => {
          this.infoSuccess = 'error';
          this.infoMessage = err.error.error.message;
          this.editInfoShowToast = true;
        }
      );
    }

    if (this.newPassword !== '') {
      this.editInfoService.editPassword(this.newPassword).subscribe(
        (res) => {
          this.passwordSuccess = 'success';
          this.passwordMessage = res.results.message;
          this.editPasswordShowToast = true;
          this.newPassword = '';
        },
        (err) => {
          this.passwordSuccess = 'error';
          this.passwordMessage = err.error.error.message;
          this.editPasswordShowToast = true;
        }
      );
    }
  }

  get firstName() {
    return this.editInfoForm.get('firstName');
  }
  get lastName() {
    return this.editInfoForm.get('lastName');
  }
  get country() {
    return this.editInfoForm.get('country');
  }
  get liveIn() {
    return this.editInfoForm.get('liveIn');
  }
  get gender() {
    return this.editInfoForm.get('gender');
  }
  get dateOfBirth() {
    return this.editInfoForm.get('dateOfBirth');
  }
  get password() {
    return this.editInfoForm.get('password');
  }
  get facebook() {
    return this.editInfoForm.get('facebook');
  }
  get instagram() {
    return this.editInfoForm.get('instagram');
  }
  get youtube() {
    return this.editInfoForm.get('youtube');
  }
  get tiktok() {
    return this.editInfoForm.get('tiktok');
  }

  toggleSeenPassword(passwordField: HTMLInputElement) {
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      this.seenPasswordImage.next(
        '../../../../../../../assets/auth-module/icons/visibility.svg'
      );
    } else {
      passwordField.type = 'password';
      this.seenPasswordImage.next(
        '../../../../../../../assets/auth-module/icons/Seen.svg'
      );
    }
  }
}
