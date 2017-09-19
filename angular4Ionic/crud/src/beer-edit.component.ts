import { Beer } from './beer.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'beer-edit',
  template: `
   <div class="panel panel-primary">
    <div class="panel-body">
      <div class="row">
        <div class="col-sm-3">
        <input type="text" [(ngModel)]="beer.name" placeholder="Name">
        </div>
        <div class="col-sm-3">
        <input type="text" [(ngModel)]="beer.country" placeholder="Country">
        </div>
        <div class="col-sm-3">
        <input type="range" [(ngModel)]="beer.alcoholicPercentage" min="0" max="15" step="0.1">
        {{beer.alcoholicPercentage}}
        </div>
        <div class="col-sm-3">
          <button type="button" class="btn btn-primary" (click)="onSave(beer)">Save</button>
          <button type="button" class="btn btn-warning" (click)="onClear()">Clear</button>
        </div>
      </div>
    </div>
   </div>
  `,
})
export class BeerEditComponent {

  @Input() beer = {};
  @Output() clear = new EventEmitter();
  @Output() save = new EventEmitter();

  onClear() {
    this.clear.emit();
  }

  onSave() {
    this.save.emit(this.beer);
  }

}
