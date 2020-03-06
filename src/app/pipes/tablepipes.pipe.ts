import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablepipes'
})
export class TablepipesPipe implements PipeTransform {

  transform(array, Id) {
    for( var i=0 ; i< array.length;i++){
      if(Id = array[i].Id) {
       return array[i].Code;
      }
    }
  }

}
