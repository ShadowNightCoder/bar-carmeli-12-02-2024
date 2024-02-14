import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';
import { catchError, map } from 'rxjs/operators';
import { CitiesData } from 'src/app/interface/citiesinfo';
import { CurrentWeather } from 'src/app/interface/currentweather';
// import { WeatherData } from 'src/app/interface/fivedaysweather';
import { DailyForecast, WeatherData } from 'src/app/interface/fivedaysweather';
import { weatherForFiveDays } from 'src/app/interface/weatherarray';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-service/error-handler.service';


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
  weatherForFiveDays: weatherForFiveDays[] = [];
  // CityFiveDaysWether: CityFiveDaysWether[] = []
  CourentCityKey = '';
  CourentCityName = '';
  CourentCityWeatherText = '';
  CourentCityTime = '';
  CourentCityWeatherTemperature: any = { Value: null, Unit: 'C', UnitType: 0 };
  defaultSearchedCity = 'tel-aviv';
  receivedData = '';

  recivedData: any;
  constructor(private weatherApi: ApiServiceService, private route: ActivatedRoute, private ErrorDialog: ErrorHandlerService) {
    this.route.queryParams.subscribe(params => {
      if(params['key']){
        console.log("recived data from redirect is: " + params['key'])
        this.defaultSearchedCity = params['key'];
      }
    });
  }

  ngOnInit(): void {
    this.getCity(this.defaultSearchedCity);
  }

  
  


  getCity(cityName: string) {
    // console.log(cityName)
    this.weatherApi.getCityInfo(cityName)
      .subscribe({
        next: (res) => {
          // this.citiesInfoArray = res;
          // console.log(res)
          for (const city of res) {
            console.log('------------------------------------')
            console.log('------------------------------------')
            console.log(city.Country)
            console.log(city.LocalizedName)
            console.log(city.Key)
            console.log('------------------------------------')
            console.log('------------------------------------')
            this.CourentCityKey = city.Key;
            this.CourentCityName = city.LocalizedName;
            this.getCityCurrentWeather(city.Key)
            this.getFiveDaysForecast(city.Key)
            break;
          }
        },
        error: () => {  this.ErrorDialog.showErrorDialog('An error occurred while fetching city information.'); }
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
          // console.log(city.WeatherText)
          this.CourentCityWeatherText = city.WeatherText;
          this.CourentCityWeatherTemperature = city.Temperature.Metric;
          this.CourentCityTime = city.LocalObservationDateTime;
        }
      },
      error: () => {  this.ErrorDialog.showErrorDialog('An error occurred while fetching City Current Weather information.'); }
    },
    )
  }



  getFiveDaysForecast(Locationkey: string) {
    console.log(Locationkey)
    this.weatherForFiveDays = []; //i dont want to add the city weather with more citys so i make sure for every request i add i delete what was in the array
    this.weatherApi.getCityDailyForecasts(Locationkey).pipe(
      catchError(() => {
        this.ErrorDialog.showErrorDialog('An error occurred while getting five days forecast.');
        return throwError('Failed to retrieve five days forecast. Please try again later.');
      })).subscribe(response => {
      response.DailyForecasts.forEach((forecast: DailyForecast) => {
        const forecast1: weatherForFiveDays = {
          Date: forecast.Date,
          Temperature: {
            Minimum: {
              Value: forecast.Temperature.Minimum.Value,
              Unit: forecast.Temperature.Minimum.Unit,
            },
            Maximum: {
              Value: forecast.Temperature.Maximum.Value,
              Unit: forecast.Temperature.Maximum.Unit,
            }
          },
          Day: {
            PrecipitationIntensity: forecast.Day.PrecipitationIntensity,
            PrecipitationType: forecast.Day.PrecipitationType
          },
          Night: {
            PrecipitationIntensity: forecast.Night.PrecipitationIntensity,
            PrecipitationType: forecast.Night.PrecipitationType
          }
        };
        // console.log("i will show you the day now! " + forecast.Day)
        this.weatherForFiveDays.push(forecast1);
        // console.log(forecast);
      });
    })
  }

}