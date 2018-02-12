import {Component} from '@angular/core';
import {ItemSliding, NavController, NavParams} from 'ionic-angular';
import {BeerProvider} from "../../providers/beer/beer";
import {FirebaseListObservable} from "angularfire2/database";

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {


    beers: FirebaseListObservable<any[]>;
    favoritesIds: any[];
    constructor(public navCtrl: NavController, public navParams: NavParams,
                private beerProvider: BeerProvider) {


    }

    ionViewDidEnter() {
        this.beerProvider.getFavoriteBeersIds().subscribe(favs => {
            this.favoritesIds = favs.map(fav => fav.$value);
            console.log(favs);
        });
        this.beers = this.beerProvider.beers;

    }

    isFavoriteBeer(beer){
        return this.favoritesIds.indexOf(beer.$key) > -1;

    }

    changeFavorite(beer, item: ItemSliding) {
        if (this.isFavoriteBeer(beer)) {
            this.beerProvider.unfavoriteBeer(beer.$key).then(_ => item.close())
        } else {
            this.beerProvider.favoriteBeer(beer.$key).then(_ => item.close());
        }
    }


}
