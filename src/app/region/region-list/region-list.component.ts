import { Component, OnInit, ViewChild } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { EntryComponent } from '../entry/entry.component';
import { ConfirmService } from 'src/app/dialog/confirm.service';
@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {

  constructor(private service: RegionService,
              private dialog: MatDialog,
              private cdialog: ConfirmService) { }
listdata: MatTableDataSource<any>;
displayedcolumns: string[] = ['code', 'description', 'status', 'actions'];
@ViewChild(MatSort, {static: false}) sort: MatSort;
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
searchkey: string;
ngOnInit() {
    this.service.getRegion().subscribe(
      list => {
        const array = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listdata = new MatTableDataSource(array);
        this.listdata.sort = this.sort;
        this.listdata.paginator = this.paginator;
      });
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
  dialogconfig.disableClose = true;
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
}

