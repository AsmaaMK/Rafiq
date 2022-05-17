import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit {
  @Input() label = '';
  @Input() selected = '';
  @Input() dropDownItems: string[] = [];
  @Output() selectedValue = new EventEmitter<string>();

  @ViewChild('inputSelected') inputSelected: any;

  filterInput = '';

  updateSelectedValue() {
    this.selectedValue.emit(this.inputSelected.nativeElement.value);
  }

  constructor() {}

  ngOnInit(): void {}

  toggleListVisibility(list: HTMLElement) {
    list.classList.toggle('open');
    document.getElementById('dropdown__arrow')?.classList.toggle('open');
    document.querySelector('.dropdown')?.classList.toggle('open');
    list.setAttribute(
      'aria-expanded',
      list.classList.contains('open').toString()
    );
  }

  setSelectedListItem(
    event: any,
    selectedItem: HTMLInputElement,
    list: HTMLElement
  ) {
    selectedItem.value = event.target.innerHTML;
    this.updateSelectedValue();

    this.closeList(list);
    document.getElementById('dropdown__selected')?.focus();
  }

  closeList(list: HTMLElement) {
    list.classList.remove('open');
    document.querySelector('.dropdown')?.classList.remove('open');
    list.setAttribute('aria-expanded', 'false');
  }

  openList(list: HTMLElement) {
    list.classList.add('open');
    document.querySelector('.dropdown')?.classList.add('open');
    list.setAttribute('aria-expanded', 'true');
  }

  focusPreviousListItem(event: any, currentIndex: number) {
    event.preventDefault();
    if (currentIndex >= 0) {
      document.getElementById(`option-${currentIndex - 1}`)?.focus();
    }
  }

  focusNextListItem(event: any, currentIndex: number) {
    event.preventDefault();
    if (currentIndex <= this.dropDownItems.length - 1) {
      document.getElementById(`option-${currentIndex + 1}`)?.focus();
    }
  }
}