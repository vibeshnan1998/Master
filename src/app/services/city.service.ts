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
  cityform: FormGroup = new FormGroup ({
    state: new FormControl(0),
    $code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('')
  });
  initializeForm() {
    this.cityform.setValue({
      state: 0,
      $code: '',
      description: '',
      status: ''
    });
  }
  getCity()  {
    this.citylist = this.firebase.list('cities');
    return this.citylist.snapshotChanges();
  }
  insertregion(city: { state: any; $code: any; description: any; status: boolean; }) {
    this.citylist.push({
      state: city.state,
      code: city.$code,
      description: city.description,
      status: city.status
    });
}
updateregion(city) {
  this.citylist.update(city.$code, {
    state: city.state,
    description: city.description,
    status: city.status
  }
    );
}
populate(city) {
  this.cityform.setValue(_.omit(city, 'statename'));
}
}
