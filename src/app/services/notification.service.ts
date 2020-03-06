import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }
config: MatSnackBarConfig = {
  duration: 2000,
  horizontalPosition: 'center',
  verticalPosition: 'top'
};
  success(msg: string) {
    this.config.panelClass = ['notification', 'success'];
    this.snackbar.open(msg, '', this.config);
}
clear(msg: string) {
  this.config.panelClass = ['notification', 'success'];
  this.snackbar.open(msg, '', this.config);
}
emptyfield(msg: string) {
  this.config.panelClass = ['notification', 'primary'];
  this.snackbar.open(msg, '', this.config);
}
update(msg: string) {
  this.config.panelClass = ['notification', 'warning'];
  this.snackbar.open(msg, '', this.config);
}
delete(msg:string) {
  this.config.panelClass =['notificatioins','accent'];
  this.snackbar.open(msg,'',this.config);
}
}
