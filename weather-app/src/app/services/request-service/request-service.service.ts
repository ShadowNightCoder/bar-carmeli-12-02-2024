import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { Observable } from 'rxjs';
import { CurrentWeather } from 'src/app/interface/currentweather';


@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  currentWeather: CurrentWeather[] = [];

  constructor(private weatherApi: ApiServiceService) { }

  getCity(cityName: string): Observable<string> {
    return new Observable(observer => {
      console.log(cityName);
      this.weatherApi.getCityInfo(cityName).subscribe({
        next: (res) => {
          console.log(res);
          for (const city of res) {
            console.log(city.Key);
            console.log(city.LocalizedName);
            observer.next(city.Key); // Emit the city key
            observer.complete(); // Complete the observable
          }
        },
        error: (error) => observer.error(error.message)
      });
    });
  }



  getCityCurrentWeather(Locationkey: string): Observable<CurrentWeather[]> {
    return new Observable<CurrentWeather[]>(observer => {
      console.log(Locationkey);
      this.weatherApi.getCityWeather(Locationkey).subscribe({
        next: (res: CurrentWeather[]) => {
          for (const city of res) {
            console.log(city.WeatherText)
            const cityCurrentWetherNow: CurrentWeather = {
              LocalObservationDateTime: city.LocalObservationDateTime,
              WeatherText: city.WeatherText,
              WeatherIcon: city.WeatherIcon,
              Temperature: {
                Metric: {
                  Value: city.Temperature.Metric.Value,
                  Unit: city.Temperature.Metric.Unit
                }
              }
            }
            this.currentWeather.push(cityCurrentWetherNow)
          }
          observer.next(this.currentWeather); // Emit the received current weather data
          observer.complete(); // Complete the observable
        },
        error: (error) => observer.error(error) // Emit error if any
      });
    });
  }







}
