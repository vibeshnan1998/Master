import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialogConfig, MatDialog, MatDialogRef,MatDialogTitle } from '@angular/material/dialog';
import { CountryViewComponent } from 'src/app/country-list/country-view/country-view.component';
import { StateViewComponent } from 'src/app/state-list/state-view/state-view.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
status = true;
lstatus: string;
  constructor(private dialog: MatDialog,
              private dialogref: MatDialogRef<CustomerDetailsComponent>) { }

  ngOnInit(): void {
  }
customer_form: FormGroup = new FormGroup ({
      customercode: new FormControl(null),
      customername: new FormControl('', Validators.required),
      customertype: new FormControl(0, Validators.required),
      status: new FormControl(0, Validators.required),
      country: new FormControl(0, Validators.required),
      location: new FormControl(0, Validators.required),
      website: new FormControl('', Validators.required),
      email: new FormControl('',Validators.email),
      controllingoffice: new FormControl(0, Validators.required),
      afflicates: new FormControl(0,  Validators.required),
      taxid: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      shortname: new FormControl('', Validators.required),
      taxexemptes: new FormControl('', Validators.required),
      comments:new FormControl('', Validators.required)
});

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
dialogclose() {
  this.dialogref.close();
}
countryadd(){
  const dialogconfig = new MatDialogConfig();
  dialogconfig.disableClose = false;
  dialogconfig.autoFocus = true;
  dialogconfig.width = '80%';
  dialogconfig.height ='90%';
  this.dialog.open(CountryViewComponent, dialogconfig);
}
locationadd(){
  const dialogconfig = new MatDialogConfig();
  dialogconfig.disableClose = false;
  dialogconfig.autoFocus = true;
  dialogconfig.width = '400px';
  this.dialog.open(StateViewComponent, dialogconfig);
}
onsubmit() {
  console.log("valid form");
}
}
