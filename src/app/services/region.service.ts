import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  regionlist: AngularFireList<any>;
  pattern = '^[a-zA-Z]+$';
  array = [];
  public clear;
  constructor(private firebase: AngularFireDatabase) {
    this.regionlist = this.firebase.list('regions');
    this.regionlist.snapshotChanges().subscribe(
      list => {
        this.array = list.map( item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    code: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    description: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    status: new FormControl('')
  });
  initializeForm() {
    this.form.setValue({
      $key: null,
      code: '',
      description: '',
      status: true
    });
  }
  /* clearForm() {
    this.form.setValue({
      code: '',
      description: '',
      status: true
    }); */
  clearform() {
    this.form.setValue({
      code: '',
      description: '',
      status: true
    });
  }
  getRegion()  {
    this.regionlist = this.firebase.list('regions');
    return this.regionlist.snapshotChanges();
  }
  insertregion(region) {
    this.regionlist.push({
      code: region.code,
      description: region.description,
      status: region.status
    });
}
updateregion(region) {
  this.regionlist.update(region.$key, {
    code: region.code,
    description: region.description,
    status: region.status
  }
    );
}
populate(region) {
  this.form.setValue(region);

}


// region to country
getregionnName($key) {
  if ($key === '0') {
    return '';
  } else {
      return _.find(this.array, (obj) => {
        return obj.$key === $key;
      }).description;
    }
}
}
