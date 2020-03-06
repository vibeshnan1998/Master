import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RegionService } from '../../services/region.service';
import { NotificationService } from '../../services/notification.service';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AbstractControl, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ConfirmService } from 'src/app/dialog/confirm.service';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RegionListComponent } from '../region-list/region-list.component';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
   lstatus = true;
 Active: string;
  clear: boolean;
  array = this.service.array;
  jsonobj = JSON.stringify(this.array);
  jsons = JSON.parse(this.jsonobj);
  constructor(public service: RegionService,
              public notificationService: NotificationService,
              public dialogref: MatDialogRef<EntryComponent>,
              public dialogreff: MatDialogRef<ConfirmDialogComponent>,
              public cdialog: ConfirmService,
              private http: HttpClient) {}
  ngOnInit() {
    this.service.getRegion();
    this.service.checkcode();
  }
  ngOnchang() {

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
    if (this.service.form.get('Id').value) {
      this.clear = true;
    } else {
      if (!this.service.form.get('Code').value && !this.service.form.get('Description').value) {
        this.notificationService.success('Fields Are Now Empty To Fill');
      } else {
        this.service.initializeForm();
        this.notificationService.success('cleared successfully');
      }
    }
  }
  onsubmit() {
    debugger
    if (this.service.form.valid) {
      if (this.service.form.get('Id').value) {
         this.service.updateregion(this.service.form.value).subscribe(
          res =>{ this.service.form.reset();
         this.dialogref.close();
       this.notificationService.update('updated Successfully');
          },
          err => {
            console.log(err);
          }
         );
         
      } else {
        this.service.insertregion(this.service.form.value).subscribe(
          res =>{
            this.service.form.reset();
        this.dialogref.close();
        this.service.initializeForm();
      this.notificationService.success('submitted Successfully');
          },
          err => {
            console.log(err);
          }
        );
        
      }
    }
  }
  
  onclose() {
    this.service.form.reset();
    this.dialogref.close();
  }
  /* code() {
              {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.jsons.length; i++) {
       if (this.jsons[i].code === HTMLFormControlsCollection.bind('code')) {
           return this.codev = true;
       }
   }
      return this.codev = null;
   }
 }
 }
  */
}
