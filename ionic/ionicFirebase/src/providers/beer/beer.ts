import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/Observable";


@Injectable()
export class BeerProvider {

    private rootPath = 'beers';


    beers: FirebaseListObservable<any>;

    currentUser: firebase.User;

    constructor(private db: AngularFireDatabase, auth: AngularFireAuth) {

        auth.authState.subscribe(user => {
            this.currentUser = user;
            if (user) {
                this.createConnection();
            } else {
                this.endConnection();
            }
        });
    }

    createConnection() {
        this.beers = this.db.list('/beers');
    }


    endConnection() {
        this.beers.$ref.off();
    }

    save(beer) {
        if (beer.$key) {
            const obj = {...beer};
            obj['$key'] = null;
            return this.beers.update(beer.$key, obj);
        }
        return this.beers.push(beer);
    }

    remove(id) {
        return this.beers.remove(id);
    }

    favoriteBeer(beerId) {
        const p1 = new Promise((resolve, reject) => {
            this.db.list(`/beerFavorite/${beerId}`)
                .push(this.currentUser.uid)
                .then(() => resolve())
                .catch((error) => reject(error));
        });
        const p2 = new Promise((resolve, reject) => {
            this.db.list(`/personFavorite/${this.currentUser.uid}`)
                .push(beerId)
                .then(() => resolve())
                .catch((error) => reject(error));
            ;
        });
        return Promise.all([p1, p2]);

    }

    unfavoriteBeer(beerId) {
        const p1 = new Promise((resolve, reject) => {
            const list = this.db.list(`/beerFavorite/${beerId}`);
            list.first().toPromise().then((userIds) => {
                userIds.forEach(uid => {
                    if (uid.$value === this.currentUser.uid) {
                        list.remove(uid.$key)
                            .then(() => resolve())
                            .catch((error) => reject(error));
                    }
                })
            })

        });
        const p2 = new Promise((resolve, reject) => {
            const list2 = this.db.list(`/personFavorite/${this.currentUser.uid}`);

            list2.first().toPromise().then(beerIds => {
                console.log(beerIds)
                beerIds.forEach(bId => {

                    if (bId.$value === beerId){
                        console.log(bId, beerId)
                        list2.remove(bId.$key)
                            .then(() => resolve())
                            .catch((error) => reject(error));
                    }
                })
            })

            ;
        });
        return Promise.all([p1, p2]);

    }


    getFavoriteBeersIds(): FirebaseListObservable<any[]> {
        return this.db.list(`/personFavorite/${this.currentUser.uid}`)
    }

    getFavoriteBeers(): Observable<any[]> {
        return Observable.create(observer => {
            this.getFavoriteBeersIds().subscribe(ids => {
                const promises = ids.map(beerId => {
                    return this.db.object(`/beers/${beerId.$value}`)
                        .first().toPromise();
                });
                Promise.all(promises).then(beers => {
                    observer.next(beers);
                });
            })
        })
    }


}
