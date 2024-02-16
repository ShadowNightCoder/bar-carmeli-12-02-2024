import { Component } from '@angular/core';
import { CelsiusfahrenheitServiceService } from 'src/app/services/toggle-button-service/celsiusfahrenheit-service.service';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {
  temperatureUnit: boolean = true; //default is Fahrenheit

  constructor(private toggle:CelsiusfahrenheitServiceService){}
  
  toggleUnits($event: any) {
    this.toggle.toggleValue($event.value)
  }
}
