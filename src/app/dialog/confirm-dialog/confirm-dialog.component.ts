import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
}
