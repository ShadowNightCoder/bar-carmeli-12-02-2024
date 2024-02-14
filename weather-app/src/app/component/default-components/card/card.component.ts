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
  src = './../../../../assets/img/7Days/sunday.png'
  dayTemperature = {
    TMinimum: 0,
    TMaximum: 0
  };
  showOrNot: any = {};

  updateShowOrNot(): void {
    this.showOrNot = {
      date: this.weatherForDay.Date,
      day: this.weatherForDay.Day.PrecipitationIntensity && this.weatherForDay.Day.PrecipitationType,
      night: this.weatherForDay.Night.PrecipitationIntensity && this.weatherForDay.Night.PrecipitationIntensity,
      temp: this.dayTemperature.TMinimum && this.dayTemperature.TMaximum,
    };
  }
  
  ngOnInit(): void {
    this.updateShowOrNot();
    const date = new Date(this.weatherForDay.Date);
    const dayIndex = date.getDay();
    this.src="./../../../../assets/img/7Days/"+this.daysOfWeek[dayIndex]+".png"

    

    if(this.weatherForDay.Temperature.Minimum.Unit === 'F'){
      this.dayTemperature.TMinimum = fahrenheitToCelsius(this.weatherForDay.Temperature.Minimum.Value.valueOf());
    }
    if(this.weatherForDay.Temperature.Maximum.Unit === 'F'){
      this.dayTemperature.TMaximum = fahrenheitToCelsius(this.weatherForDay.Temperature.Maximum.Value.valueOf());
    }

  }



}
