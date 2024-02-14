import { Injectable } from '@angular/core';
import { favCity } from 'src/app/interface/favoritcity';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private localStorage: Storage;

  // Initialize favoriteCities in localStorage if it doesn't exist
  constructor() {
    this.localStorage = window.localStorage;
  }

  setLocalStorage(name: string) {
    console.log("adding now")
    const existingData = localStorage.getItem('favoriteCities'); // Retrieve existing data
    if (existingData) {
      console.log("adding now ------")
      const cities = existingData.split(',');
      if (!cities.includes(name)) { // If the city doesn't exist, add it
        localStorage.setItem('favoriteCities', existingData + ',' + name);
      }
    }
    else {
      this.localStorage.setItem('favoriteCities', name);
    }
  }

  // Retrieve existing data and filter out specific data
  removeLocalStorage(cityToRemove: string) {
    const existingData = localStorage.getItem('favoriteCities'); 
    console.log("removing now this now  " + cityToRemove)
    if (existingData) {
      const updatedData = existingData.split(',').filter(item => item.trim() !== cityToRemove);
      const cleanedData = updatedData.join(',');
      localStorage.setItem('favoriteCities', cleanedData); 
    }
  }
}
