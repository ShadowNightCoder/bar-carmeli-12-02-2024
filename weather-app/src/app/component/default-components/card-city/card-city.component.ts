import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-city',
  templateUrl: './card-city.component.html',
  styleUrls: ['./card-city.component.scss']
})
export class CardCityComponent {
  @Input() CourentName = '';
  @Input() CourentCityWeatherText = '';
  @Input() CourentCityTime = '';
  @Input() CourentCityWeatherTemperature: any = { Value: 0, Unit: 'C', UnitType: 0 };
}
