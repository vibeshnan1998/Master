import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RegionService } from '../../services/region.service';
import { NotificationService } from '../../services/notification.service';
import { MatDialogRef, MatSlideToggleChange, MatDialogConfig, MatDialog } from '@angular/material';
import { AbstractControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ConfirmService } from 'src/app/dialog/confirm.service';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
   status = true;
  lstatus: string;
  clear: boolean;
  array = this.service.array;
  jsonobj = JSON.stringify(this.array);
  jsons = JSON.parse(this.jsonobj);
  constructor(public service: RegionService,
              public notificationService: NotificationService,
              public dialogref: MatDialogRef<EntryComponent>,
              public dialogreff: MatDialogRef<ConfirmDialogComponent>,
              public cdialog: ConfirmService) {
  }
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
    if (this.service.form.get('$key').value) {
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
    if (this.service.form.valid) {
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
    this.cdialog.openconfirmdialog('save and close')
      .afterClosed().subscribe(res => {
    if (res) {
      if (this.service.form.valid) {
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
    } else {
      this.dialogreff.close();
    }
  });
    this.dialogreff.close();
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
