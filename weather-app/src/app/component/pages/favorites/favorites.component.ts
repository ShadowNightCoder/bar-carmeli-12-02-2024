import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';
import { LocalstorageService } from 'src/app/services/local-storage-service/localstorage.service';
import { favCity } from 'src/app/interface/favoritcity';
import { ErrorHandlerService } from 'src/app/services/error-service/error-handler.service';

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
    cityList: string[] = [];
    favoritCityList: favCity[] = [];


    constructor(private weatherApi: ApiServiceService, private storage: LocalstorageService, private ErrorDialog: ErrorHandlerService) { }

    async ngOnInit(): Promise<void> {
        const localStorageValue = this.storage.getLocalStorage();
        if (localStorageValue) {
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
                            await this.getCityCurrentWeather(city.Key);
                            break;
                        }
                        resolve();
                    },
                    error: () => { this.ErrorDialog.showErrorDialog('An error occurred while fetching city information.'); }
                });
        });
    }



    async getCityCurrentWeather(Locationkey: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            console.log(Locationkey);
            this.weatherApi.getCityWeather(Locationkey).subscribe({
                next: (res) => {
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
                    resolve();
                },
                error: () => { this.ErrorDialog.showErrorDialog('An error occurred while fetching City Current Weather information.'); }
            });
        });
    }

}
