import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { dayOrNight, isEnglishLettersOnly } from 'src/app/generic-func/genericFunc';
import { ApiServiceService } from 'src/app/services/api-service/api-service.service';
import { ErrorHandlerService } from 'src/app/services/error-service/error-handler.service';
import { RequestServiceService } from 'src/app/services/recived-data-service/request-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  inputLive = '';
  inputEnglishOnley = true;
  cityList: any[] = [];
  selectedCity = {
    key: '',
    name: '',
    country: ''
  };
  optionSelected: boolean = false;
  timeStatus = '';
  src = '';
  badInput = false;
  errorShow = '';
  @Input() cityTime = '';
  @Output() citySelected = new EventEmitter<{ cityName: string, cityKey: string }>();


  constructor(private request: RequestServiceService) {}


  ngOnInit(): void {
    dayOrNight(this.cityTime).then((timeStatus) => {
      // console.log("its a " + timeStatus)
      this.timeStatus = timeStatus;
      if (this.timeStatus === 'day') {
        this.src = './../../../../assets/img/day-night/day.jpg';
      } else if (this.timeStatus === 'night') {
        this.src = './../../../../assets/img/day-night/some-city.jpg';
        // this.src = './../../../../assets/img/day-night/moonnight.jpg';
      } else {
        this.src = './../../../../assets/img/day-night/someUnknownHour.jpg';
      }
    })
  }


  autoComplete() {
    this.inputEnglishOnley = isEnglishLettersOnly(this.inputLive)
    if (this.inputEnglishOnley) {
      this.badInput = false;
      console.log(this.inputLive)
      this.request.getCity(this.inputLive).subscribe((citiesInfoArray: any[]) => {
        this.cityList = citiesInfoArray;
        console.log(this.cityList)
      })
    }
    else if (!this.inputEnglishOnley) {
      this.badInput = true;
      this.errorShow = "You entered invalid input. Please only enter English letters!"
    }
    if (this.inputLive === '') {
      this.badInput = false;
      this.cityList = []
    }
    return this.inputEnglishOnley
  }


  onOptionSelected(city: any) {
    this.selectedCity = city;
    this.optionSelected = true;
  }


  onSubmit() {
    this.inputEnglishOnley = this.autoComplete()
    if (this.inputEnglishOnley) {
      this.citySelected.emit({cityKey: this.selectedCity.key, cityName: this.selectedCity.name});
    }
    this.inputLive = ''
  }
}
