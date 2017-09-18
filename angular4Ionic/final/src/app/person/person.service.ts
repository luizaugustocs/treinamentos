import {Person} from './person.model';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Injectable} from '@angular/core';


@Injectable()
export class PersonService {

  private collection = '/person';

  constructor(private db: AngularFireDatabase) {
  }


  getAll(): FirebaseListObservable<Person[]> {
    return this.db.list(this.collection);
  }

  getById(id: String): FirebaseObjectObservable<Person> {
    return this.db.object(`${this.collection}/${id}`)
  }

  save(person: Person) {
    return new Promise((resolve, reject) => {
      const key = person.$key;
      delete person.$key;
      if (key !== 'new') {
        return this.db.object(`${this.collection}/${key}`).update(person)
          .then(() => resolve())
          .catch(() => reject());
      }
      delete person.$value;
      return this.db.list(this.collection).push(person)
        .then(() => resolve())
        .catch(() => reject());
      ;
    });
  }

  remove(id) {
    return this.db.list(this.collection).remove(id);
  }

  findByName(name: String) {
    return this.db.list(this.collection, {
      query: {
        orderByChild: 'name',
        startAt: name
      }
    })
      .first()
      .toPromise()
  }
}
