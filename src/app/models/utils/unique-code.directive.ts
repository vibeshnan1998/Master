import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { observable, Observable } from 'rxjs';
import { RegionService } from '..//..//services/region.service';
import { map } from 'rxjs/Operators';
@Directive({
  selector: '[appUniqueCode]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueCodeDirective, multi: true }]
})
export class UniqueCodeDirective {

  constructor(private reg: RegionService) { }
  /* validate(c: AbstractControl): Promise< ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.reg.getregionbycode(c.value).pipe(
      map(code => {
        return code && code.length > 0 ? {'appUniqueCode': true} : null;
      })
    );
  } */
}
