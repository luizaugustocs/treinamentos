import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'beer-list',
  template: `
    
  `,
})
export class BeerListComponent {

  @Input() beers = [];
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  onEdit(beer) {
    this.edit.emit(beer);
  }

  onRemove(beer) {
    this.remove.emit(beer);
  }

}
