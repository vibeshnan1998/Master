import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { RegionService } from './region.service';

export class Region {
  Id: number;
  RegionId: number;
  Code: string;
  Description: string;
  Active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
array = [];
country;
private apiurl='http://localhost:65177/api/countries';
pattern = '^[a-zA-Z ]+$';
public clear;
jsonobj = JSON.stringify(this.array);

  constructor(private http: HttpClient,
              private Rservice: RegionService) {
              
   }
        
   //country
  countryform: FormGroup = new FormGroup ({
    Id: new FormControl(0),
    RegionId: new FormControl([], Validators.required),
    Code: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    Description: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    Active: new FormControl(true),
    Region: new FormControl([])
  });


  initializeForm() {
    this.countryform.setValue({
      Id: 0,
      RegionId: 0,
      Code: '',
      Description: '',
    Active: true
    });
  }
  getCountry()  {
    return this.http.get(this.apiurl);
  }
  getRegion(Id) {
    return this.http.get('http://localhost:65177/api/regions/api/returncheckcode?Code='+ Id);
  }
  insertcountry(country) {
    return this.http.post(this.apiurl,country);
}
getCountryById(Id) {
  return this.http.get<Region>(this.apiurl+'/'+ Id);
}
updatecountry(country) {
  return this.http.put(this.apiurl +'/'+ country.Id,country);
}
deletecountry(Id) {
  return this.http.delete(this.apiurl +'/'+Id);
}
populate(Id) {
  this.getCountryById(Id).subscribe( Country => {this.country = Country},
  err => console.log(err));
  console.log(this.country);
  let countryset = { Id: this.country.Id,
                     Code: this.country.Code,
                     Desciptions: this.country.Desciption,
                     RegionId: {
                       Id: this.country.Region.Id,
                       Code: this.country.Region.Code,
                       Description: this.country.Description},
                     Region: 'd'
                     };
                     this.countryform.setValue(countryset);
  }
getcountryName(Id) {
  if (Id == 0) {
    return '';
  } else {
      return _.find(this.array, (obj) => {
         return obj.Id === Id;
        }).Description;
    }
}

}
