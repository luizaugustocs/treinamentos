import { Person } from './../person.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PersonService } from './../person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'person-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  public entity: Person;

  constructor(private service: PersonService,private router: Router, private route: ActivatedRoute) {
    this.entity = new Person();
  }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.service.getById(params['id']))
    .subscribe((obj) => {
      console.log(obj);
      this.entity = {
        ... obj
      }
      this.entity.$key = obj.$key;
      //this.entity = obj;
    })
  }

  save(){
    return this.service.save(this.entity)
    .then(() => {
      this.router.navigate(['../..'], {relativeTo: this.route})
    })
  }
  goBack(){
    this.router.navigate(['../..'], {relativeTo: this.route})
  }

}
