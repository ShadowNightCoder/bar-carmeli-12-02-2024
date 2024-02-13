import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';
import { map } from 'rxjs/operators';
import { CitiesData } from 'src/app/interface/citiesinfo';
import { CurrentWeather } from 'src/app/interface/currentweather';
// import { WeatherData } from 'src/app/interface/fivedaysweather';
import { DailyForecast, WeatherData } from 'src/app/interface/fivedaysweather';
import { weatherForFiveDays } from 'src/app/interface/weatherarray';


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
  CourentName = '';
  CourentCityWeatherText = '';
  CourentCityTime = '';
  CourentCityWeatherTemperature: any = { Value: 0, Unit: 'C', UnitType: 0 };


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
          this.CourentCityTime = city.LocalObservationDateTime;
        }
      },
      error: (error) => { error.message }
    },
    )
  }



  getFiveDaysForecast(Locationkey: string) {
    console.log(Locationkey)
    this.weatherApi.getCityDailyForecasts(Locationkey).subscribe(response => {
      // const { Headline: { Text: WeatherData } } = response;
      // console.log(WeatherData);
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
        console.log("i will show you the day now! " + forecast.Day)
        this.weatherForFiveDays.push(forecast1)
        console.log(forecast);
      });
    })
  }

}














