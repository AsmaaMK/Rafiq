import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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
  @ViewChild('dropDown') dropDown: any;

  filterInput = '';

  updateSelectedValue() {
    this.selectedValue.emit(this.inputSelected.nativeElement.value);
  }

  constructor() {}

  ngOnInit(): void {
    this.filterInput = this.selected;
  }

  toggleListVisibility(list: HTMLElement) {
    list.classList.toggle('open');
    this.dropDown.nativeElement.classList.toggle('open');
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
  }

  closeList(list: HTMLElement) {
    list.classList.remove('open');
    this.dropDown.nativeElement.classList.remove('open');
    list.setAttribute('aria-expanded', 'false');
  }

  openList(list: HTMLElement) {
    list.classList.add('open');
    this.dropDown.nativeElement.classList.add('open');
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
