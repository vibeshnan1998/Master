import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegionService } from 'src/app/services/region.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { EntryComponent } from '../entry/entry.component';
import { ConfirmService } from 'src/app/dialog/confirm.service';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { Regions } from 'src/app/models/utils/Region';
//  var jsPDF = require('jspdf');
// let jsPDF: any;
@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {
  array;
  array1;
  constructor(private service: RegionService,
              private dialog: MatDialog,
              private cdialog: ConfirmService,
              private httpService: HttpClient) { }
listdata: MatTableDataSource<any>;
displayedcolumns: string[] = ['code', 'description', 'status', 'actions'];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
searchkey: string;

ngOnInit() {
        this.service.getRegion()
        .subscribe(data => {
        console.log(data);
        this.array = data;
        console.log(this.array);
        this.array1 = JSON.stringify(this.array);
        console.log(this.array1);
      });
        console.log(this.array);
        this.listdata = new MatTableDataSource(this.array1);
        this.listdata.sort = this.sort;
        this.listdata.paginator = this.paginator;
  }
  onsearchclear() {
    this.searchkey = '';
  }
  applyFilter() {
    this.listdata.filter = this.searchkey.trim().toLowerCase();
  }
 oncreate() {
  this.service.initializeForm();
  const dialogconfig = new MatDialogConfig();
  dialogconfig.disableClose = false;
  dialogconfig.autoFocus = true;
  dialogconfig.width = '400px';
  this.dialog.open(EntryComponent, dialogconfig);
}
onEdit(row) {
  this.service.populate(row);
  const dialogconfig = new MatDialogConfig();
  dialogconfig.disableClose = true;
  dialogconfig.autoFocus = true;
  dialogconfig.width = '400px';
  this.dialog.open(EntryComponent, dialogconfig);
}
/* downloadpdf(){
  console.log('downloading pdf');
  const col = ['code' , 'descritpion' , 'active'];
  const row = [];
  let doc = new jsPDF('1', 'pt');
  const table = this.array;
  table.forEach(elemetn => {
      const temp = [elemetn.code, elemetn.description , elemetn.active ];
      row.push(temp);
    });
  doc.autoTable(col, row);
  doc.save('Region.pdf');
}
 */
/* downloadpdf() {

  let columns = ["ID", "Name", "Country"];
  let rows = [
      [1, "Shaw", "Tanzania"],
      [2, "Nelson", "Kazakhstan"],
      [3, "Garcia", "Madagascar"],
  ];

  let doc = new jspdf('l', 'pt');
  doc.autoTable(columns, rows); // typescript compile time error
  doc.save('table.pdf');
}
 */}

