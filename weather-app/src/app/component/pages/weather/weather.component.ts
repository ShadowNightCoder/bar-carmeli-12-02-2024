import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { map } from 'rxjs/operators';
import { CitiesData } from 'src/app/interface/citiesinfo';
import { CurrentWeather } from 'src/app/interface/currentweather';
import { CityFiveDaysWetherArray } from 'src/app/interface/fivedaysweather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  cityCurrentWeather: any;
  cityKey: any;
  fiveDaysForecast: string[] = [];
  citiesInfoArray: CitiesData[] = [];
  CurrentWeatherArray: CurrentWeather[] = [];
  CityFiveDaysWether: CityFiveDaysWetherArray = []
  CourentName = '';
  CourentCityWeatherText = '';
  CourentCityWeatherTemperature : any = {Value: 0, Unit: 'C', UnitType: 0};


  recivedData: any;
  constructor(private weatherApi: ApiServiceService) { }

  ngOnInit(): void {
    this.getCity("tel-aviv");
  }



  getCity(cityName: string) {
    console.log(cityName)
    this.weatherApi.getCityInfo(cityName)
      .subscribe({
        next: (res) => {
          // this.citiesInfoArray = res;
          console.log(res)
          for (const city of res) {
            console.log(city.Key)
            this.CourentName = city.LocalizedName;
            this.getCityCurrentWeather(city.Key)
            this.getFiveDaysForecast(city.Key)
          }
        },
        error: (error) => { error.message }
      },
      )
  }


  getCityCurrentWeather(Locationkey: string) {
    console.log(Locationkey)
    this.weatherApi.getCityWeather(Locationkey).subscribe({
      next: (res) => {
        // this.CurrentWeatherArray = res;
        console.log(res)
        for (const city of res) {
          console.log(city.WeatherText)
          this.CourentCityWeatherText = city.WeatherText;
          this.CourentCityWeatherTemperature = city.Temperature.Metric;
        }
      },
      error: (error) => { error.message }
    },
    )
  }



  getFiveDaysForecast(Locationkey: string) {
    console.log(Locationkey)
    this.weatherApi.getCityDailyForecasts(Locationkey).subscribe({
      next: (res) => {
        console.log(res)
        for (const city of res) {
          console.log(city.DailyForecasts)
          this.CityFiveDaysWether.push(city)
        }
        console.log('--------------------END')
        console.log(this.CityFiveDaysWether)
      },
      error: (error) => { error.message }
    },
    )
  }

}
