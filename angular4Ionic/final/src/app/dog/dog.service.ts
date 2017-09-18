import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {Dog} from "./dog.model";

@Injectable()
export class DogService {


  private collection = '/dog';

  constructor(private db: AngularFireDatabase) {
  }


  getAll(): FirebaseListObservable<Dog[]> {
    return this.db.list(this.collection);
  }

  getById(id: String): FirebaseObjectObservable<Dog> {
    return this.db.object(`${this.collection}/${id}`)
  }

  save(dog: Dog) {
    return new Promise((resolve, reject) => {
      const key = dog.$key;
      delete dog.$key;
      if (key !== 'new') {
        return this.db.object(`${this.collection}/${key}`).update(dog)
          .then(() => resolve())
          .catch(() => reject());
      }
      delete dog.$value;
      return this.db.list(this.collection).push(dog)
        .then(() => resolve())
        .catch(() => reject());
      ;
    });
  }

  remove(id) {
    return this.db.list(this.collection).remove(id);
  }

}
