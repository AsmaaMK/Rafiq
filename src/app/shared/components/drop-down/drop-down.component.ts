import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit {
  @Input() label = 'Filter By';
  @Input() dropDownItems = [
    {
      icon: '',
      value: 'Best Rated',
    },
    {
      icon: '',
      value: 'Country',
    },
    {
      icon: '',
      value: 'City',
    },
  ];

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
    selectedItem: HTMLElement,
    list: HTMLElement
  ) {
    selectedItem.innerHTML =
      event.target.nodeName === 'LI'
        ? event.target.innerHTML
        : event.target.parentNode.innerHTML;

    this.closeList(list);
    document.getElementById('dropdown__selected')?.focus();
  }

  closeList(list: HTMLElement) {
    list.classList.remove('open');
    document.querySelector('.dropdown')?.classList.remove('open');
    list.setAttribute('aria-expanded', 'false');
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
