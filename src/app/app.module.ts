import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import {MaterialModule} from './material/material.module';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material';

import { EntryComponent } from './region/entry/entry.component';
import { RegionService } from './services/region.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
// Angular firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
 // environments
import {environment} from '../environments/environment';
import { RegionListComponent } from './region/region-list/region-list.component';
import { OnlynumbersDirective } from './models/utils/onlynumbers.directive';
import { OnlycharacterDirective } from './models/utils/onlycharacter.directive';
import { CountryListComponent } from './country-list/country-list.component';
import { StateListComponent } from './state-list/state-list.component';
import { CityListComponent } from './city-list/city-list.component';
import { CountryViewComponent } from './country-list/country-view/country-view.component';
import { StateViewComponent } from './state-list/state-view/state-view.component';
import { CityViewComponent } from './city-list/city-view/city-view.component';
import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';
import { CityService } from './services/city.service';
import { ToolbarComponent } from './auth/toolbar/toolbar.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthModule} from '@angular/fire/auth';
@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    RegionListComponent,
    OnlynumbersDirective,
    OnlycharacterDirective,
    RoutingComponents,
    CountryListComponent,
    StateListComponent,
    CityListComponent,
    CountryViewComponent,
    StateViewComponent,
    CityViewComponent,
    ToolbarComponent,
    LoginComponent,
    AngularFireAuthModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AngularFireAuthModule
  ],
  providers: [RegionService, CountryService, StateService, CityService],
  bootstrap: [AppComponent],
  entryComponents: [StateViewComponent, EntryComponent, CountryViewComponent]
})
export class AppModule { }
