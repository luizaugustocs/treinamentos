import {FirebaseListObservable} from 'angularfire2/database';
import {PersonService} from './../person.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Person} from './../person.model';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'person-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PersonListComponent implements OnInit {

  constructor(private service: PersonService, private router: Router, private route: ActivatedRoute) {
  }

  private personList: FirebaseListObservable<Person[]>;

  ngOnInit() {
    this.personList = this.service.getAll();
  }

  edit(id) {
    console.log(id);
    this.router.navigate(['details', id], {relativeTo: this.route});
  }

}
