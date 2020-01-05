import { Component, OnInit } from '@angular/core';
import { StateService} from 'src/app/services/state.service';
import { CountryService } from 'src/app/services/country.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef, MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-state-view',
  templateUrl: './state-view.component.html',
  styleUrls: ['./state-view.component.css']
})
export class StateViewComponent implements OnInit {
  private status = false;
  lstatus = 'Active';
    constructor(private service: StateService,
                private Cservice: CountryService,
                private notificationService: NotificationService,
                public dialogref: MatDialogRef<StateViewComponent>) { }
    ngOnInit() {
  this.service.getstate();
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
      if (!this.service.stateform.get('$code').value && !this.service.stateform.get('description').value) {
        this.notificationService.success('Fields Are Now Empty To Fill');
        } else {
          this.notificationService.success('cleared successfully');
        }
      this.service.initializeForm();
      this.service.stateform.reset();
     }
     onsubmit() {
       if ( this.service.stateform.valid) {
         if (!this.service.stateform.get('$code').value) {
           this.service.insertstate(this.service.stateform.value);
           this.service.stateform.reset();
           this.service.initializeForm();
           this.notificationService.success('Submitted Successfully');
              } else {
                this.service.updatestate(this.service.stateform.value);
                this.notificationService.success('Updated Successfully');
                this.dialogref.close();
                     }
                   }
      }
       onclose() {
         this.service.stateform.reset();
         this.service.initializeForm();
         this.dialogref.close();
       }
}
