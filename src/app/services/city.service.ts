import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private firebase: AngularFireDatabase) { }
  citylist: AngularFireList<any>;
  pattern = '^[a-zA-Z ]+$';
  public clear;
  cityform: FormGroup = new FormGroup ({
    $key: new FormControl(null),
    state: new FormControl(0),
    code: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    description: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    status: new FormControl('')
  });
  initializeForm() {
    this.cityform.setValue({
      $key: null,
      state: 0,
      code: '',
      description: '',
      status: ''
    });
  }
  getCity()  {
    this.citylist = this.firebase.list('cities');
    return this.citylist.snapshotChanges();
  }
  insertcity(city: { state: any; code: any; description: any; status: boolean; }) {
    this.citylist.push({
      state: city.state,
      code: city.code,
      description: city.description,
      status: city.status
    });
}
updatecity(city) {
  this.citylist.update(city.$key, {
    state: city.state,
    code: city.code,
    description: city.description,
    status: city.status
  }
    );
}
populate(city) {
  this.cityform.setValue(_.omit(city, 'statename'));
}
}
