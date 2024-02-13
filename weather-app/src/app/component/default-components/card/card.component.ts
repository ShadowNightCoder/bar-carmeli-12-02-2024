import { Component, Input, OnInit } from '@angular/core';
import { weatherForFiveDays } from 'src/app/interface/weatherarray';
import { fahrenheitToCelsius } from 'src/app/generic-func/genericFunc';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  @Input() weatherForDay!: weatherForFiveDays;

  daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  src = ''
  dayTemperature = {
    TMinimum: 0,
    TMaximum: 0
  };
  
  ngOnInit(): void {
    const date = new Date(this.weatherForDay.Date);
    const dayIndex = date.getDay();
    console.log(date)
    console.log(this.daysOfWeek[dayIndex])
    this.src="./../../../../assets/img/7Days/"+this.daysOfWeek[dayIndex]+".png"

    

    if(this.weatherForDay.Temperature.Minimum.Unit === 'F'){
      this.dayTemperature.TMinimum = fahrenheitToCelsius(this.weatherForDay.Temperature.Minimum.Value.valueOf());
    }
    if(this.weatherForDay.Temperature.Maximum.Unit === 'F'){
      console.log("the weather is: f " + this.weatherForDay.Temperature.Maximum.Value)
      this.dayTemperature.TMaximum = fahrenheitToCelsius(this.weatherForDay.Temperature.Maximum.Value.valueOf());
      console.log("the weather is: C " + this.weatherForDay.Temperature.Maximum.Value)
    }

  }



}
