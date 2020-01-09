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
  lstatus: string;
  clear: boolean;
  array = this.service.array;
 jsonobj = JSON.stringify(this.array);
 jsons = JSON.parse(this.jsonobj);
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
      if ( this.service.stateform.get('$key').value) {
        this.clear = true;
      } else {
       if (!this.service.stateform.get('code').value && !this.service.stateform.get('description').value) {
         this.notificationService.success('Fields Are Now Empty To Fill');
         } else {
           this.service.initializeForm();
           this.notificationService.success('cleared successfully');
         }
      }
     }
     onsubmit() {
      if ( this.service.stateform.valid) {
        if (this.service.stateform.get('$key').value) {
   this.service.updatestate(this.service.stateform.value);
   this.service.stateform.reset();
   this.dialogref.close();
   this.notificationService.update('updated Successfully');
        } else {
   this.service.insertstate(this.service.stateform.value);
   this.service.stateform.reset();
   this.dialogref.close();
   this.service.initializeForm();
   this.notificationService.success('submitted Successfully');
      }
     }
      }
       onclose() {
         this.service.stateform.reset();
         this.service.initializeForm();
         this.dialogref.close();
       }
}
