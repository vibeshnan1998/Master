import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject} from 'rxjs';
import * as Sentry from '@sentry/browser';
import { tap, debounceTime } from 'rxjs/operators';
export class Region {
  Id: number;
  Code: string;
  Description: string;
  Active: boolean;
  
}
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  // jsons = JSON.parse(this.jsonobj);
  myAppUrl: string;
  myApiUrl: string;
  pattern = '^[a-zA-Z ]+$';
  array : any;
  DupCode;
  code1;
  public clear;
  jsonobj = JSON.stringify(this.array);
  codetemp;
  apiurl = 'http://localhost:65177/api/regions';
  
  
  constructor(private http: HttpClient) {
      this.myApiUrl = 'Region/';
      this.getRegion();
      this.DupCode='';
      this.getRegion()
        .subscribe(data => {
        this.array = data;
        console.log(this.array)});
        this.code.valueChanges.subscribe(code=> this.DupCode=code);
  }

  
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Code: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    Description: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    Active: new FormControl(true)
  });

  initializeForm() {
    this.form.setValue({
      Id: 0,
      Code: '',
      Description: '',
      Active: true
    });
  }

  
  getRegion(){
    return this.http.get(this.apiurl);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      Sentry.captureException(error.error);
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'cant able to get value from the api url');
  }

  
  insertregion(region: Region) {
    console.log(region);
   return this.http.post(this.apiurl,region);
  }
  updateregion(region: Region ) {
    return this.http.put(this.apiurl + '/' + region.Id,region);
  }
  deleteregion(Id) {
    return this.http.delete(this.apiurl+ '/'+ Id);
  }
  populate(region) {
    this.form.setValue(region);
  }

  get code() {
    return this.form.get('Code');
  }
  get Id(){
    return this.form.get('Id');
  }
  checkcode() {
    if(!this.Id.value) {
    this.code.valueChanges.pipe(
      debounceTime(100)).subscribe(code => this.http.get('http://localhost:65177/api/regions/api/Regionsub/checkcode?Code='+ code)
      .subscribe((codes: any) => { 
        if(codes.length > 0) {
          this.code.markAsPending({onlySelf: false});
          this.code.setErrors({notUnique: true})
        }
        else {
          this.code.markAsPending({onlySelf: false});
          this.code.setErrors(null);
        }
      }));
    }
    else{
      this.getId().pipe(
        debounceTime(1000))
        .subscribe((Id: any) => { 
          this.codetemp = Id;
          if(this.code.value == this.codetemp[0].Code) {
              this.code.markAsPending({onlySelf: false});
              this.code.setErrors(null);
            }
            else {
              for(var i = 0; i < this.array.length;i++) {
                      if(this.array[i].Code == this.DupCode){
                        this.code.markAsPending({onlySelf: false});
                        this.code.setErrors({notUnique: true});
                        break;
                      }
              }    
            }
          }
      );
    }
  }
  getId() {
    return this.http.get('http://localhost:65177/api/regions/api/updatecheckcode?Id='+ this.Id.value);
  }
  // region to country
  getregionnName(Id) {
    if (Id === 0) {
      return '';
    } else {
      return _.find(this.array, (obj) => {
        return obj.Id === Id;
      }).description;
    }
  }
  
}
