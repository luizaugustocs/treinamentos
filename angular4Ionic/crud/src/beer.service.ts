import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Beer } from './beer.model';
@Injectable()
export class BeerService {

  errorHandler = error => console.error('BeerService error', error);
  private baseUrl = 'https://ionicbeers.firebaseio.com';
  private collection = 'beers';

  constructor(private http: Http) {
  
    }

  addBeer(beer) {
    const json = JSON.stringify(beer);
    console.log(this);
    console.log(this.http);
    return this.http.post(`${this.baseUrl}/${this.collection}.json`, json)
      .toPromise()
      .catch(this.errorHandler);
  }

  getBeers() {
    return this.http.get(`${this.baseUrl}/${this.collection}.json`)
      .toPromise()
      .then(response => this.convert(response.json()))
      .catch(this.errorHandler);
  }

  removeBeer(beer) {

  }

  updateBeer(beer) {
    const { name, country, alcoholicPercentage } = beer;
    const json = JSON.stringify({
      name, country, alcoholicPercentage
    })
    return this.http.patch(`${this.baseUrl}/${this.collection}/${beer.id}.json`, json)
      .toPromise()
      .catch(this.errorHandler);
  }

  private convert(parsedResponse) {
    return Object.keys(parsedResponse)
      .map(id => ({
        id: id,
        name: parsedResponse[id].name,
        country: parsedResponse[id].country,
        alcoholicPercentage: parsedResponse[id].alcoholicPercentage
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

}
