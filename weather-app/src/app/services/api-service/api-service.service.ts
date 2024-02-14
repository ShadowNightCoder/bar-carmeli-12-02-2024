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

  apiKey = "zVLAaZrK6FEXvZbKqUBu8DsSScgAQs9X"

  baseUrl = "http://dataservice.accuweather.com";

  constructor(private http: HttpClient) { }

  // Returns basic information about locations matching an autocomplete of the search text
  getCityInfo(city: string){
    return this.http.get<CitiesData[]>(`${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${city}`);
  }
  
  // Returns current conditions data for a specific location.
  getCityWeather(locationKey: string){
    return this.http.get<CurrentWeather[]>(`${this.baseUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`);
  }
  
  // Returns an array of daily forecasts for the next 5 days for a specific location
  getCityDailyForecasts(locationKey: string){
    return this.http.get<WeatherData>(`${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}`);
  }

}
