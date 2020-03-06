import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionListComponent } from './region/region-list/region-list.component';
import { CountryListComponent } from './country-list/country-list.component';
import { StateListComponent } from './state-list/state-list.component';
import { CityListComponent } from './city-list/city-list.component';
import { CustomerListComponent } from './customers-client/customer-list/customer-list.component';

const routes: Routes = [
  {path: '', component: RegionListComponent, runGuardsAndResolvers: 'always'},
  {path: 'region', component: RegionListComponent,  runGuardsAndResolvers: 'always'},
  {path: 'country', component: CountryListComponent,  runGuardsAndResolvers: 'always'},
  {path: 'state', component: StateListComponent,  runGuardsAndResolvers: 'always'},
  {path: 'city', component: CityListComponent,  runGuardsAndResolvers: 'always'},
  {path: 'customer-list', component: CustomerListComponent,  runGuardsAndResolvers: 'always'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [RegionListComponent, CountryListComponent, StateListComponent, CityListComponent, CustomerListComponent  ];
