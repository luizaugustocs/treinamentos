import {Component, OnInit} from '@angular/core';
import {Dog} from "../dog.model";
import {DogService} from "../dog.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FirebaseListObservable} from "angularfire2/database";
import {Person} from "../../person/person.model";
import {PersonService} from "../../person/person.service";

@Component({
  selector: 'dog-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DogDetailsComponent implements OnInit {


  private entity: Dog;

  private owners: any[];

  constructor(private service: DogService, private personService: PersonService, private router: Router, private route: ActivatedRoute) {
    this.entity = new Dog();
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.service.getById(params['id']))
      .subscribe((obj) => {
        console.log(obj);
        this.entity = {
          ...obj
        }
        this.entity.$key = obj.$key;
        //this.entity = obj;
      })
  }

  save() {
    return this.service.save(this.entity)
      .then(() => {
        this.router.navigate(['../..'], {relativeTo: this.route})
      })
  }

  goBack() {
    this.router.navigate(['../..'], {relativeTo: this.route})
  }

  search(event) {
    this.personService.findByName(event.query).then(list => {
      this.owners = list;
    });
  }
}
