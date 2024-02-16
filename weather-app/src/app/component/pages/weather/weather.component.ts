import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';
import { weatherForFiveDays } from 'src/app/interface/weatherarray';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-service/error-handler.service';
import { RequestServiceService } from 'src/app/services/recived-data-service/request-service.service';
import { CurrentCity } from 'src/app/interface/courentcity';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  cityList: any[] = [];
  CourentCityKey = '';
  CourentCityName = '';
  CourentCity: CurrentCity = {
    weatherText: '',
    timeRightNow: '',
    temperatureImperial: { value: null, unit: '', unitType: 0 },
    weatherIcon: ''
  }
  fiveDaysForecastArray: weatherForFiveDays[] = [];
  wantendCity: any[] = [];
  defaultSearchedCity = 'Tel Aviv';


  recivedData: any;
  constructor(private route: ActivatedRoute, private request: RequestServiceService) {
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        console.log("recived data from redirect is: " + params['key'])
        this.defaultSearchedCity = params['key'];
      }
    });
  }


  ngOnInit(): void {
    this.reciveCity(this.defaultSearchedCity);
  }


  reciveCity(cityName: string) {
    this.request.getCity(cityName).subscribe((citiesInfoArray: any[]) => {
      this.cityList = citiesInfoArray;
      this.wantendCity = this.cityList.filter(city => city.name === cityName);
      this.CourentCityKey = this.wantendCity[0].key;
      this.CourentCityName = cityName;
      this.reciveCityCurrentWeather(this.CourentCityKey);
    })
  }


  reciveCityCurrentWeather(Locationkey: string, cityName?: string) {
    if(cityName){
      this.CourentCityName = cityName;
    }

    this.request.getCityCurrentWeather(Locationkey).subscribe((currentCity: any[]) => {
      currentCity.map(city => {
        this.CourentCity.timeRightNow = city.cityWeatherDate;
        this.CourentCity.weatherText = city.cityWeatherText;
        this.CourentCity.temperatureImperial.unit = city.cityWeatherTemperatureImperial.Unit;
        this.CourentCity.temperatureImperial.value = city.cityWeatherTemperatureImperial.Value;
        this.CourentCity.temperatureImperial.unitType = city.cityWeatherTemperatureImperial.UnitType;
        this.CourentCity.weatherIcon = city.cityWeatherIcon;
      })
      this.getFiveDaysForecast(Locationkey)
    })
  }


  getFiveDaysForecast(Locationkey: string) {
    this.request.getFiveDaysForecast(Locationkey).subscribe((currentCity: any) => {
      this.fiveDaysForecastArray = currentCity;
      console.log(this.fiveDaysForecastArray)
    });
  }
}