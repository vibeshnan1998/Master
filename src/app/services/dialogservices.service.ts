import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogservicesService {

  constructor(private dialog: MatDialog) { }
  openconfirmDialog(msg) {
   return this.dialog.open(ConfirmDialogComponent,{
      width: '350px',
      disableClose: false,
      data : {
        message: msg
      }
    })
  }
}
