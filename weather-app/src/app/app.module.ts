import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/default-components/header/header.component';
import { WeatherComponent } from './component/pages/weather/weather.component';
import { FavoritesComponent } from './component/pages/favorites/favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './component/default-components/search/search.component';
import { CardComponent } from './component/default-components/card/card.component';
import { StoreModule } from '@ngrx/store';
import { CourentNameReducer } from './ngrx-store/city.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CardCityComponent } from './component/default-components/card-city/card-city.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    FavoritesComponent,
    SearchComponent,
    CardComponent,
    CardCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    StoreModule.forRoot({
      cityName: CourentNameReducer
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
