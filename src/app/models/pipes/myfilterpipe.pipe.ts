import { Pipe, PipeTransform } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyfilterpipePipe implements PipeTransform {

  transform(regi: any[], filter: (reg: any[]) => any[]): any[] {
    if (!regi || !filter) {
        return regi;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return regi.filter(reg => reg.status.indexOf(filter.status) !== -1);
}
}


