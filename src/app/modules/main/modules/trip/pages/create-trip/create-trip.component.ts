import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/shared/services/countries.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss'],
})
export class CreateTripComponent implements OnInit {
  countries!: string[];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.getAllCountries();
  }

  setSelectedValue(value: any, input: HTMLInputElement) {
    input.value = value;
  }
}
