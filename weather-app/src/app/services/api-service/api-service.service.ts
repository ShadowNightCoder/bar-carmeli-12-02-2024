import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CitiesData } from '../../interface/citiesinfo';
import { CurrentWeather } from '../../interface/currentweather';
// import { CityFiveDaysWether } from '../interface/fivedaysweather';
// import { WeatherData } from '../interface/fivedaysweather';
import { WeatherData } from '../../interface/fivedaysweather';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // apiKey = "66zJIB9DVMGj8YEtonBIlMEQSelBt7sm"
  apiKey = "O7X9al4UR6GuaARJCI2MZ1rnn3fxImZ9"
  // apiKey = "dS4Iic7jmXlhGzadZZVLUUT8jIqVLXeS"
  // apiKey = "Nus9RINGbCgdPoGrzH7MNjpfbOsYVxiA"

  constructor(private http: HttpClient) { }

  // Returns basic information about locations matching an autocomplete of the search text
  getCityInfo(city: string){
    return this.http.get<CitiesData[]>(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${city}`);
  }
  
  // Returns current conditions data for a specific location.
  getCityWeather(locationKey: string){
    return this.http.get<CurrentWeather[]>(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`);
  }
  
  // Returns an array of daily forecasts for the next 5 days for a specific location
  getCityDailyForecasts(locationKey: string){
    return this.http.get<WeatherData>(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}`);
  }



}
