import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';
import { LocalstorageService } from 'src/app/services/local-storage-service/localstorage.service';
import { favCity } from 'src/app/interface/favoritcity';
import { ErrorHandlerService } from 'src/app/services/error-service/error-handler.service';
import { RequestServiceService } from 'src/app/services/recived-data-service/request-service.service';
import { CurrentCity } from 'src/app/interface/courentcity';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    cityList: any[] = [];
    wantendCity: any[] = [];
    favoritCityList: favCity[] =[];
    CourentCityName = '';



    CourentCityWeatherText = '';
    CourentCityWeatherTemperature = { Value: null, Unit: '' };
    CourentCityTime = '';

    // cityList: string[] = [];


    constructor(private request: RequestServiceService, private storage: LocalstorageService, private ErrorDialog: ErrorHandlerService) { }

    async ngOnInit(): Promise<void> {
        const localStorageValue = this.storage.getLocalStorage();
        if (localStorageValue) {
            this.cityList = localStorageValue.split(',');
        }

        for (const city of this.cityList) {
            console.log('-the city is ----- ' + city);
            await this.reciveCity(city);
        }
    }



    reciveCity(cityName: string): Promise<void> {
        this.CourentCityName = cityName;
        return new Promise<void>((resolve, reject) => {
            this.request.getCity(cityName).subscribe((citiesInfoArray: any[]) => {
                this.cityList = citiesInfoArray;
                this.wantendCity = this.cityList.filter(city => city.name === cityName);
                this.reciveCityCurrentWeather(this.wantendCity[0].key, cityName);
                resolve();
            }, error => {
                console.error('Error fetching city:', error);
                reject(error);
            });
        });
    }



    // async getCity(cityName: string): Promise<void> {
    //     this.CourentCityName = cityName;
    //     return new Promise<void>((resolve, reject) => {
    //         this.weatherApi.getCityInfo(cityName)
    //             .subscribe({
    //                 next: async (res) => {
    //                     for (const city of res) {
    //                         console.log(city.Country);
    //                         console.log(city.LocalizedName);
    //                         console.log(city.Key);
    //                         await this.getCityCurrentWeather(city.Key);
    //                         break;
    //                     }
    //                     resolve();
    //                 },
    //                 error: () => { this.ErrorDialog.showErrorDialog('An error occurred while fetching city information.'); }
    //             });
    //     });
    // }



    async reciveCityCurrentWeather(Locationkey: string, cityName?:string): Promise<void> {
        const favCityName = cityName ? cityName : this.CourentCityName;
        return new Promise<void>((resolve, reject) => {
            this.request.getCityCurrentWeather(Locationkey).subscribe((currentCity: any[]) => {
                currentCity.map(city => {
                    this.favoritCityList.push({
                        cityid: Locationkey,
                        name: favCityName,
                        weather: city.cityWeatherText
                    })
                });
                resolve();
            }, error => {
                console.error('Error fetching current weather:', error);
                reject(error);
            });
        });
    }


    // async getCityCurrentWeather(Locationkey: string): Promise<void> {
    //     return new Promise<void>((resolve, reject) => {
    //         console.log(Locationkey);
    //         this.weatherApi.getCityWeather(Locationkey).subscribe({
    //             next: (res) => {
    //                 console.log(res);
    //                 for (const city of res) {
    //                     console.log(city.WeatherText);
    //                     this.CourentCityWeatherText = city.WeatherText;
    //                 }
    //                 this.favoritCityList.push({
    //                     cityID: Locationkey,
    //                     name: this.CourentCityName,
    //                     weather: this.CourentCityWeatherText
    //                 });
    //                 resolve();
    //             },
    //             error: () => { this.ErrorDialog.showErrorDialog('An error occurred while fetching City Current Weather information.'); }
    //         });
    //     });
    // }

}
