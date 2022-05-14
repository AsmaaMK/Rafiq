import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from '../../models/city';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  numberOfChildren = 0;
  findHotelForm = new FormGroup(
    {
      checkin_date: new FormControl('', [Validators.required]),
      checkout_date: new FormControl('', [Validators.required]),
      room_number: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(30),
      ]),
      adults_number: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(30),
      ]),
      children_number: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      children_ages: new FormArray([]),
    },
    { validators: [CustomeDateValidators.fromToDate('fromDate', 'toDate')] }
  );

  cityId = this.router.url.split('/')[3];
  hotels: Hotel[] = [
  //   {
  //     address:
  //       ' address address address address address address address address',
  //     bookingLink: '',
  //     image: 'assets/main-module/post-images/Albania2.png',
  //     name: 'Hotel Soka',
  //     numberOfReviews: 4,
  //     price: 455,
  //     reviewScore: 23,
  //     reviewScoreWord: 'good',
  //   },
  //   {
  //     address: 'address address address address',
  //     bookingLink: '',
  //     image: 'assets/main-module/post-images/Albania2.png',
  //     name: 'Hotel Soka',
  //     numberOfReviews: 4,
  //     price: 455,
  //     reviewScore: 23,
  //     reviewScoreWord: 'good',
  //   },
  //   {
  //     address: 'address address address address',
  //     bookingLink: '',
  //     image: 'assets/main-module/post-images/Albania2.png',
  //     name: 'Hotel Soka',
  //     numberOfReviews: 4,
  //     price: 455,
  //     reviewScore: 23,
  //     reviewScoreWord: 'good',
  //   },
  //   {
  //     address: 'address address address address',
  //     bookingLink: '',
  //     image: 'assets/main-module/post-images/Albania2.png',
  //     name: 'Hotel Soka',
  //     numberOfReviews: 4,
  //     price: 455,
  //     reviewScore: 23,
  //     reviewScoreWord: 'good',
  //   },
  //   {
  //     address: 'address address address address',
  //     bookingLink: '',
  //     image: 'assets/main-module/post-images/Albania2.png',
  //     name: 'Hotel Soka',
  //     numberOfReviews: 4,
  //     price: 455,
  //     reviewScore: 23,
  //     reviewScoreWord: 'good',
  //   },
  ];

  constructor(private cityService: CityService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    let hotelInfo = this.findHotelForm.value;
    let params: { key: string; value: string }[] = [];
    Object.entries(hotelInfo).forEach(([k, v]) => {});

    for (let key in hotelInfo) {
      let paramValue = hotelInfo[key];
      if (key === 'children_ages') {
        paramValue = '';

        for (let i = 0; i < hotelInfo[key].length; i++) {
          paramValue += `${hotelInfo[key][i]},`;
        }
        paramValue = paramValue.slice(0, paramValue.length - 1);
      }

      params.push({ key: key, value: paramValue });
    }

    this.cityService.getHotels(this.cityId, params).subscribe((res) => {
      this.hotels = res;
    });
  }

  changeNumberOfChildren(number: number) {
    if (number > this.numberOfChildren) {
      this.numberOfChildren++;
      this.children_ages.push(
        new FormControl('', [Validators.required, Validators.max(17)])
      );
    } else {
      this.numberOfChildren--;
      this.children_ages.removeAt(number);
    }
  }

  get checkin_date() {
    return this.findHotelForm.get('checkin_date');
  }
  get checkout_date() {
    return this.findHotelForm.get('checkout_date');
  }
  get room_number() {
    return this.findHotelForm.get('room_number');
  }
  get adults_number() {
    return this.findHotelForm.get('adults_number');
  }
  get children_number() {
    return this.findHotelForm.get('children_number');
  }
  get children_ages() {
    return this.findHotelForm.get('children_ages') as FormArray;
  }
}

export class CustomeDateValidators {
  static fromToDate(
    fromDateField: string,
    toDateField: string,
    errorName: string = 'fromToDate'
  ): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const fromDate = formGroup.get(fromDateField)?.value;
      const toDate = formGroup.get(toDateField)?.value;
      // Ausing the fromDate and toDate are numbers. In not convert them first after null check
      if (fromDate !== null && toDate !== null && fromDate > toDate) {
        return { [errorName]: true };
      }
      return null;
    };
  }
}
