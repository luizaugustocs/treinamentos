import { Beer } from './beer.model';
import { Component } from '@angular/core';
import { BeerService } from './beer.service';

@Component({
  selector: 'beer-app',
  template: `
    <beer-edit [beer]="editableBeer"
      (save)="save($event)" (clear)="clear()"></beer-edit>
    <beer-list [beers]="beers"
      (edit)="edit($event)" (remove)="remove($event)"></beer-list>
  `,
})
export class AppComponent {

  beers = [];
  editableBeer = {};

  constructor(private beerService: BeerService) {
    console.log(beerService)
    beerService.errorHandler = error =>
      window.alert('Oops! The server request failed.');
    this.reload();
  }

  clear() {
    this.editableBeer = new Beer();
  }

  edit(beer) {
  }

  remove(beer) { 
  }

  save(beer) {    
    const method = beer.id ? 'updateBeer' : 'addBeer';
    this.beerService[method](beer).then(() => this.reload())
    this.clear();
  }

  private reload() {
    this.beerService.getBeers().then(beers => {
      this.beers = beers;
    })
  }

}
