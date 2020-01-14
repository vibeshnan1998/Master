import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogreff: MatDialogRef<ConfirmDialogComponent>,
              private service: RegionService) { }

  ngOnInit() {
  }
oncdclose() {
  this.dialogreff.close(false);
}
/* yes() {
this.service.onsubmit();
}
no() {
  this.dialogreff.close();
  this.service.onclose();
} */
}
