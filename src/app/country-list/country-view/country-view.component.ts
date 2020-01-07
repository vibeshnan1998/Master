import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef, MatSlideToggleChange } from '@angular/material';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.css']
})
export class CountryViewComponent implements OnInit {
  private status = false;
  lstatus = 'Active';
    constructor(private service: CountryService,
                private Rservice: RegionService,
                private notificationService: NotificationService,
                public dialogref: MatDialogRef<CountryViewComponent>) { }
    ngOnInit() {
  this.service.getCountry();
    }
    toggle(event: MatSlideToggleChange) {
      console.log('toggle', event.checked);
      this.status = event.checked;
      if (this.status === true) {
               this.lstatus = 'Active';
      } else {
        this.lstatus = 'InActive';
      }
    }
    onclear() {
      if (!this.service.countryform.get('code').value && !this.service.countryform.get('description').value) {
        this.notificationService.success('Fields Are Now Empty To Fill');
        } else {
          this.notificationService.success('cleared successfully');
        }
      this.service.initializeForm();
      this.service.countryform.reset();
     }
     onsubmit() {
       if ( this.service.countryform.valid) {
         if (!this.service.countryform.get('$key').value) {
           this.service.insertregion(this.service.countryform.value);
           this.service.countryform.reset();
           this.service.initializeForm();
           this.notificationService.success('Submitted Successfully');
              } else {
                this.service.updateregion(this.service.countryform.value);
                this.notificationService.success('Updated Successfully');
                this.dialogref.close();
                     }
                   }
      }
       onclose() {
         this.service.countryform.reset();
         this.service.initializeForm();
         this.dialogref.close();
       }
}
