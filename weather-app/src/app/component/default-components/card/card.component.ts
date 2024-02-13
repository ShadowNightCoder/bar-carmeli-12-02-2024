import { Component, Input } from '@angular/core';
import { weatherForFiveDays } from 'src/app/interface/weatherarray';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() weatherForDay!: weatherForFiveDays;


}
