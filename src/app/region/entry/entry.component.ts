import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {RegionService} from '../../services/region.service';
import {NotificationService} from '../../services/notification.service';
import {MatDialogRef, MatSlideToggleChange, MatDialogConfig, MatDialog} from '@angular/material';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
 private status = true;
 lstatus: string;
 clear: boolean;
  constructor(private service: RegionService,
              private notificationService: NotificationService,
              public dialogref: MatDialogRef<EntryComponent>,
              private dialog: MatDialog) { }
  ngOnInit() {
this.service.getRegion();
  }
  toggle(event: MatSlideToggleChange) {
    console.log('toggle', event.checked);
    this.status = true;
    this.status = event.checked;
    if (this.status === true) {
             this.lstatus = 'Active';
    } else {
      this.lstatus = 'InActive';
    }
  }
  onclear() {
    if ( this.service.form.get('$key').value) {
     this.clear = true;
   } else {
    if (!this.service.form.get('code').value && !this.service.form.get('description').value) {
      this.notificationService.success('Fields Are Now Empty To Fill');
      } else {
        this.service.initializeForm();
        this.notificationService.success('cleared successfully');
      }
   }
   }
   onsubmit() {
     if ( this.service.form.valid) {
       if (this.service.form.get('$key').value) {
  this.service.updateregion(this.service.form.value);
  this.service.form.reset();
  this.dialogref.close();
  this.notificationService.update('updated Successfully');
       } else {
  this.service.insertregion(this.service.form.value);
  this.service.form.reset();
  this.dialogref.close();
  this.service.initializeForm();
  this.notificationService.success('submitted Successfully');
     }
    }
  }
     onclose() {
       this.service.form.reset();
       this.service.initializeForm();
       this.dialogref.close();
     }
   }
