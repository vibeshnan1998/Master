import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { matchValues } from '../validators/validators';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {Regions} from '../models/utils/Region';
import { environment } from 'src/environments/environment';
export interface Region {
  Id: number;
  code: string;
  description: string;
  active: string;
}
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  // jsons = JSON.parse(this.jsonobj);
  myAppUrl: string;
  myApiUrl: string;
  constructor(private firebase: AngularFireDatabase,
              private firestore: AngularFirestore,
              private http: HttpClient) {
    /* this.regionlist = this.firebase.list('regions');
    this.regionlist.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }); */
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'Region/';
  }
  regionlist: AngularFireList<any>;
  pattern = '^[a-zA-Z ]+$';
  array = [];
  public clear;
  jsonobj = JSON.stringify(this.array);

  form: FormGroup = new FormGroup({
    Id: new FormControl(null),
    code: new FormControl('', [Validators.required, Validators.pattern(this.pattern), matchValues(this.array) ]),
    description: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    status: new FormControl('')
  });

  getRegion(): Observable<Regions[]> {
    return this.http.get<Regions[]>('https://localhost:44349/api/Region');
  }

  initializeForm() {
    this.form.setValue({
      Id: null,
      code: '',
      description: '',
      status: true
    });
  }
  /* getRegion() {
    this.regionlist = this.firebase.list('regions');
    return this.regionlist.snapshotChanges();
  } */
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
