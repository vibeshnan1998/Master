import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  listdata: MatTableDataSource<any>;
  displayedcolumns: string[] = ['customername', 'customertype', 'location','country', 'controllingoffice'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchkey: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onsearchclear() {
    this.searchkey = '';
  }
  applyFilter() {
    this.listdata.filter = this.searchkey.trim().toLowerCase();
  }
  oncreate() {
    const dialogconfig = new MatDialogConfig();
  dialogconfig.disableClose = false;
  dialogconfig.autoFocus = true;
  dialogconfig.width = '1800px';
  dialogconfig.height = '900px';
  this.dialog.open(CustomerDetailsComponent, dialogconfig);
  }
}
