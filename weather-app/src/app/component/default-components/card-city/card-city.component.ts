import { Component, Input } from '@angular/core';
import { CurrentCity } from 'src/app/interface/courentcity';
import { favCity } from 'src/app/interface/favoritcity';
import { LocalstorageService } from 'src/app/services/local-storage-service/localstorage.service';

@Component({
  selector: 'app-card-city',
  templateUrl: './card-city.component.html',
  styleUrls: ['./card-city.component.scss']
})
export class CardCityComponent {
  @Input() CourentCityKey = '';
  @Input() CourentCityName = '';
  @Input() CityInfo: CurrentCity = {
    weatherText: '',
    timeRightNow: '',
    weatherIcon: '',
    temperatureImperial: {
      value: null,
      unit: '',
      unitType: 0
    }
  };



  @Input() CourentCityTime = '';
  @Input() CourentCityWeatherText = '';

  @Input() CourentCityWeatherTemperature: any = { Value: 0, Unit: 'C', UnitType: 0 };
  favoritCityList: favCity[] = [];

  constructor(private storage: LocalstorageService){}

  addCity() {
    this.storage.setLocalStorage(this.CourentCityName)
  }

  removeCity(){
    this.storage.removeLocalStorage(this.CourentCityName)
  }
}
