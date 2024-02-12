import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  timeStatus = 'night'
  src = ''
  @Output() citySelected = new EventEmitter<string>();

  ngOnInit(): void {
      if(this.timeStatus === 'day'){
        this.src='./../../../../assets/img/day-night/day.jpg'
      }
      else{
        this.src='./../../../../assets/img/day-night/moonnight.jpg'
      }
  }

  onSubmit(CityInput: string) {
    this.citySelected.emit(CityInput); // Emit the city data
  }

  
  
  
}
