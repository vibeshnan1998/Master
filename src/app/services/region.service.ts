import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { matchValues } from '../validators/validators';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  // jsons = JSON.parse(this.jsonobj);
  constructor(private firebase: AngularFireDatabase,
              private firestore: AngularFirestore) {
    this.regionlist = this.firebase.list('regions');
    this.regionlist.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }
  regionlist: AngularFireList<any>;
  pattern = '^[a-zA-Z ]+$';
  array = [];
  public clear;
  jsonobj = JSON.stringify(this.array);

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    code: new FormControl('', [Validators.required, Validators.pattern(this.pattern), /* matchValues() */]),
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
  getRegion() {
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
