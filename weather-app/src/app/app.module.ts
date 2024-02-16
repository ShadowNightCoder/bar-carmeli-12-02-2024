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
import { FavoritCityCardComponent } from './component/default-components/favorit-city-card/favorit-city-card.component';
import { MatCardModule } from '@angular/material/card';
import { ErrorDialogComponent } from './component/default-components/error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    FavoritesComponent,
    SearchComponent,
    CardComponent,
    CardCityComponent,
    FavoritCityCardComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
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
