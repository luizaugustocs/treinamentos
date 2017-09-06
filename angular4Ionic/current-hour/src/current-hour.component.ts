import { CurrentHourService } from './current-hour.service';
import { Component } from '@angular/core';


@Component({
  selector: 'current-hour',
  template: `<p><em>{{currentDate | date: 'HH:mm:ss' }}</em></p>`
})
export class CurrentHourComponent {
  currentDate: Date;

  parsedDate: String;
  constructor(currentHourService: CurrentHourService) {
    currentHourService.getCurrentDate((date: Date) => {
      this.currentDate = date;
    })
  }

}
