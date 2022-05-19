import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-drop-down',
  templateUrl: './search-drop-down.component.html',
  styleUrls: ['./search-drop-down.component.scss'],
})
export class SearchDropDownComponent implements OnInit {
  @Input() label = '';
  @Input() selected = '';
  @Input() dropDownItems: string[] = [];

  @Output() selectedValue = new EventEmitter<string>();

  @ViewChild('dropDown') dropDown: any;
  @ViewChild('selectedInput') selectedInput: any;

  updateSelectedValue() {
    this.selectedValue.emit(this.selectedInput.nativeElement.innerHTML);
  }

  constructor() {}

  ngOnInit(): void {}

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
    selectedItem: HTMLElement,
    list: HTMLElement
  ) {
    selectedItem.innerHTML = event.target.innerHTML;
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
