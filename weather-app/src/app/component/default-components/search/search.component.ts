import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { dayOrNight } from 'src/app/generic-func/genericFunc';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  timeStatus = ''
  src = ''
  @Input() cityTime = '';

  @Output() citySelected = new EventEmitter<string>();

  ngOnInit(): void {

    dayOrNight(this.cityTime).then((timeStatus) => {
      console.log("its a " + timeStatus)
      this.timeStatus = timeStatus;
      if (this.timeStatus === 'day') {
        this.src = './../../../../assets/img/day-night/day.jpg';
      } else if (this.timeStatus === 'night') {
        this.src = './../../../../assets/img/day-night/moonnight.jpg';
      } else {
        this.src = './../../../../assets/img/day-night/someUnknownHour.jpg';
      }
    })


    // this.timeStatus = dayOrNight(this.cityTime)
    // if (this.timeStatus === 'day') {
    //   this.src = './../../../../assets/img/day-night/day.jpg'
    // }
    // else if (this.timeStatus === 'day') {
    //   this.src = './../../../../assets/img/day-night/moonnight.jpg'
    // }
    // else {
    //   this.src = './../../../../assets/img/day-night/someUnknownHoure.jpg'
    // }
  }

  onSubmit(CityInput: string) {
    this.citySelected.emit(CityInput); // Emit the city data
  }




}
