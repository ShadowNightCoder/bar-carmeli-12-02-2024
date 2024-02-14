import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';
import { LocalstorageService } from 'src/app/services/local-storage-service/localstorage.service';
import { favCity } from 'src/app/interface/favoritcity';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  CourentCityWeatherText = '';
  CourentCityWeatherTemperature = { Value: null, Unit: '' };
  CourentCityTime = '';
  CourentCityName = '';
  cityList : string[] = [];
  favoritCityList : favCity[] = [];


  constructor(private weatherApi: ApiServiceService, private storage: LocalstorageService) { }

  async ngOnInit(): Promise<void> {
    console.log("first thing")
    const localStorageValue = this.storage.getLocalStorage();
    if(localStorageValue){
        console.log("what inside localstorage???? " + localStorageValue);
        this.cityList = localStorageValue.split(',');
    }

    for (const city of this.cityList) {

      console.log('-the city is ----- ' + city);
      await this.getCity(city);
  }
}


async getCity(cityName: string): Promise<void> {
  this.CourentCityName = cityName;
  return new Promise<void>((resolve, reject) => {
      this.weatherApi.getCityInfo(cityName)
          .subscribe({
              next: async (res) => {
                  for (const city of res) {
                      console.log(city.Country);
                      console.log(city.LocalizedName);
                      console.log(city.Key);
                      console.log('------------------------------121212121212121------');
                      console.log('------------------------------------');
                      await this.getCityCurrentWeather(city.Key);
                      break;
                  }
                  resolve();
              },
              error: (error) => {
                  reject(error);
              }
          });
  });
}



async getCityCurrentWeather(Locationkey: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
      console.log(Locationkey);
      this.weatherApi.getCityWeather(Locationkey).subscribe({
          next: (res) => {
              console.log('**********************************');
              console.log('**********************************');
              console.log('**********************************');
              console.log(res);
              for (const city of res) {
                  console.log(city.WeatherText);
                  this.CourentCityWeatherText = city.WeatherText;
              }

              this.favoritCityList.push({
                  cityID: Locationkey,
                  name: this.CourentCityName,
                  weather: this.CourentCityWeatherText
              });
              console.log('111111111111111111111111111111111111111111111111');
              console.log('111111111111111111111111111111111111111111111111');

              console.log(this.favoritCityList);

              console.log('111111111111111111111111111111111111111111111111');
              console.log('111111111111111111111111111111111111111111111111');
              resolve();
          },
          error: (error) => { reject(error); }
      });
  });
}

}
