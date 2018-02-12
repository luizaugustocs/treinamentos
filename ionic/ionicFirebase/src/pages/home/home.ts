import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BeerProvider} from "../../providers/beer/beer";
import {FirebaseListObservable} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {


    beers: Promise<any[]>;

    constructor(public navCtrl: NavController, public beerProvider: BeerProvider) {

    }


    ionViewDidLoad() {
        this.beers = this.beerProvider.getFavoriteBeers().first().toPromise();

    }

}
