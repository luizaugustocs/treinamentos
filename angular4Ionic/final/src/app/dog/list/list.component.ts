import { Component, OnInit } from '@angular/core';
import {Dog} from "../dog.model";
import {FirebaseListObservable} from "angularfire2/database";
import {DogService} from "../dog.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'dog-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class DogListComponent implements OnInit {

  constructor(private service: DogService, private router: Router, private route: ActivatedRoute) {
  }
  private dogList: FirebaseListObservable<Dog[]>;

  ngOnInit() {
    this.dogList = this.service.getAll();
  }

  edit(id) {
    console.log(id);
    this.router.navigate(['details', id], {relativeTo: this.route});
  }
  remove(id){
    return this.service.remove(id);
  }
  refresh() {
    this.dogList = this.service.getAll();
  }
}
