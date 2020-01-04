import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class StateService {

  array = [];
  constructor(private firebase: AngularFireDatabase) {
    this.statelist = this.firebase.list('countries');
    this.statelist.snapshotChanges().subscribe(
      list => {
        this.array = list.map( item => {
          return {
            $code: item.key,
            ...item.payload.val()
          };
        });
      });
   }

  statelist: AngularFireList<any>;
  stateform: FormGroup = new FormGroup ({
    country: new FormControl(0),
    $code: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', Validators.required),
    status: new FormControl('')
  });
  initializeForm() {
    this.stateform.setValue({
      country: 0,
      $code: '',
      description: '',
      status: true
    });
  }
  getState()  {
    this.statelist = this.firebase.list('states');
    return this.statelist.snapshotChanges();
  }
  insertstate(state: { country: any; $code: any; description: any; status: boolean; }) {
    this.statelist.push({
      country: state.country,
      code: state.$code,
      description: state.description,
      status: state.status
    });
}
updatestate(state) {
  this.statelist.update(state.$code, {
    country: state.country,
    description: state.description,
    status: state.status
  }
    );
}
populate(state) {
  this.stateform.setValue( _.omit(state, 'countryname'));
}
getstateName($code) {
  if ($code === '0') {
    return '';
  } else {
      return _.find(this.array, (obj) => {
         return obj.$code === $code;
        }).description;
    }
}


}
