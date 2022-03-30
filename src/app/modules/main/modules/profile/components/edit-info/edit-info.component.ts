import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { EditInfoService } from '../../services/edit-info.service';

@Component({
  selector: 'profile-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
  @Input() show = this.editInfoService.showEditInfo.value;
  seenPasswordImage = new BehaviorSubject(
    '../../../../../../../assets/auth-module/icons/Seen.svg'
  );

  constructor(private editInfoService: EditInfoService, private countriesService: CountriesService) {}

  countries = this.countriesService.getAllCountries();
  
  ngOnInit(): void {}

  closeEditInfo() {
    this.editInfoService.showEditInfo.next(false);
  }

  editInfo() {}

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

