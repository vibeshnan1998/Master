import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private cdialog: MatDialog) { }

  openconfirmdialog(msg) {
    return this.cdialog.open(ConfirmDialogComponent, {
      width: '390px',
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      data: {
        message: msg
      }
    });
  }
}
