import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.css']
})
export class CountryViewComponent implements OnInit {
   Active: string;
  lstatus = true;
  clear: boolean;
   array: any;
   RegionId = {"Id":"null","Code":"-" , "Description":"None"};
    constructor(public service: CountryService,
                public Rservice: RegionService,
                public notificationService: NotificationService,
                public dialogref: MatDialogRef<CountryViewComponent>) { }
    ngOnInit() {
  this.service.getCountry().subscribe(reg =>
    this.array = reg);
    }
    toggle(event: MatSlideToggleChange) {
      console.log('toggle', event.checked);
      this.lstatus = true;
      this.lstatus = event.checked;
      if (this.lstatus == true) {
        this.Active = 'true';
      } else {
        this.Active = 'false';
      }
    }
    onclear() {
      if ( this.service.countryform.get('Id').value) {
        this.clear = true;
      } else {
       if (!this.service.countryform.get('Code').value && !this.service.countryform.get('Description').value) {
         this.notificationService.success('Fields Are Now Empty To Fill');
         } else {
           this.service.initializeForm();
           this.notificationService.success('cleared successfully');
         }
      }
     }
     onsubmit() {
      if ( this.service.countryform.valid) {
        if (this.service.countryform.get('Id').value) {
   this.service.updatecountry(this.service.countryform.value).subscribe(res =>{ 
    this.service.countryform.reset();
   this.dialogref.close();
   this.notificationService.update('updated Successfully');},
   error => {console.error(error)});
   
        } else {
   this.service.insertcountry(this.service.countryform.value).subscribe(res => {
    console.log(res);
    this.service.countryform.reset();
    this.dialogref.close();
    this.service.initializeForm();
    this.notificationService.success('submitted Successfully');
  });
  
      }
     }
      }
       onclose() {
         this.service.countryform.reset();
         this.dialogref.close();
       }
}
