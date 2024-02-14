import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorit-city-card',
  templateUrl: './favorit-city-card.component.html',
  styleUrls: ['./favorit-city-card.component.scss']
})
export class FavoritCityCardComponent {
  @Input() CourentCityKey = '';
  @Input() CourentCityName = '';
  @Input() CourentCityWeatherText = '';

  dataToSend = {};

  constructor(private router: Router){}

  sendToHome(){
    this.dataToSend = { key: this.CourentCityName };
    this.router.navigate(['/home'], { queryParams: this.dataToSend });
  }
}
