import { Person } from './person.model';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable()
export class PersonService {

  private collection = '/person';

  constructor(private db: AngularFireDatabase) { }


  getAll(): FirebaseListObservable<Person[]> {
    return this.db.list(this.collection);
  }

  getById(id: String): FirebaseObjectObservable<Person> {
    return this.db.object(`${this.collection}/${id}`)
  }

  save(person: Person) {
    // const prom: Promise<Person> = new Promise({});
    if (person.$key !== 'new'){
//Update
      return this.db.object(`${this.collection}/${person.$key}`).update(person);
    }
    return this.db.list(this.collection).push(person);
  }

  update(person: Person) {

  }



  private convert(parsedResponse) {
    return Object.keys(parsedResponse)
      .map(id => ({
        id: id,
        title: parsedResponse[id].title,
        url: parsedResponse[id].url
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }
}
