import {AbstractControl , ValidatorFn} from '@angular/forms';
import { RegionService } from '../services/region.service';

export const matchValues = (array): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: boolean } => {
      const controlValue = control.value;
      const res = array.findIndex(el => el.code === +controlValue);
      console.log(res);
      console.log(array);
      // console.log(this.ser.array);
      return res !== -1 ? null : { matched: true };
    };
  };
