import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegionService } from 'src/app/services/region.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EntryComponent } from '../entry/entry.component';
import { ConfirmService } from 'src/app/dialog/confirm.service';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { Regions } from 'src/app/models/utils/Region';
import { NGXLogger } from 'ngx-logger';
import { interval, Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { DialogservicesService } from 'src/app/services/dialogservices.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, NavigationEnd } from '@angular/router';
export class Region {
  Id: number;
  Code: string;
  Description: string;
  Active: boolean;
  
}
@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit, OnDestroy {
  array;
  array1;
  navigationSubscription;
  constructor(private service: RegionService,
              private notifcation: NotificationService,
              private dialog: MatDialog,
              private dialogservice: DialogservicesService,
              private cdialog: ConfirmService,
              private httpService: HttpClient,
              private router: Router) {

                this.navigationSubscription = this.router.events.subscribe((e: any) => {
                  // If it is a NavigationEnd event re-initalise the component
                  if (e instanceof NavigationEnd) {
                    this.initialiseInvites();
                  }
                });
              }
listdata: MatTableDataSource<any>;
displayedcolumns: string[] = ['Code', 'Description', 'Active', 'actions'];
dataChange: BehaviorSubject<Region[]> = new BehaviorSubject<Region[]>([]);
@ViewChild(MatSort) sort: MatSort;
@ViewChild('myTable') table: MatTable<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
searchkey: string;

initialiseInvites() {
  this.service.getRegion()
        .subscribe(data => {
        this.array = data;
        console.log(this.array);
        console.log(this.array1);
        this.listdata = new MatTableDataSource(this.array);
        this.listdata.sort = this.sort;
        this.listdata.paginator = this.paginator;
        });
}
buttonClick() {
  this.router.navigateByUrl('/region');
}
ngOnInit() {
        this.service.getRegion()
        .subscribe(data => {
        this.array = data;
        console.log(this.array);
        console.log(this.array1);
        this.listdata = new MatTableDataSource(this.array);
        this.listdata.sort = this.sort;
        this.listdata.paginator = this.paginator;
        });
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
   }
  }
  onsearchclear() {
    this.searchkey = '';
  }
  applyFilter() {
    this.listdata.filter = this.searchkey.trim().toLowerCase();
  }
 refreshTable() {
    // If there's no data in filter we do update using pagination, next page or previous page
    this.paginator._changePageSize(this.paginator.pageSize);
    }
 oncreate() {
   this.service.form.reset();
   this.service.initializeForm();
  const dialogconfig = new MatDialogConfig();
  dialogconfig.disableClose = false;
  dialogconfig.autoFocus = true;
  dialogconfig.width = '400px';
  this.dialog.open(EntryComponent, dialogconfig).afterClosed().subscribe(res =>
    this.table.renderRows());
}
ngOnchange() {
  
}
onEdit(row) {
  this.service.populate(row);
  const dialogconfig = new MatDialogConfig();
  dialogconfig.disableClose = true;
  dialogconfig.autoFocus = true;
  dialogconfig.width = '400px';
  this.dialog.open(EntryComponent, dialogconfig).afterClosed().subscribe(res =>
    this.table.renderRows());

}
ondelete(Id){
  this.dialogservice.openconfirmDialog('Are you sure to delete the Region')
  .afterClosed().subscribe(res => {
    if(res) {
      this.service.deleteregion(Id).subscribe(res =>{ 
        this.notifcation.delete('Deleted Successfully');
        this.refreshTable();
      },
      err => {console.log(err);} );
      
    }
  });
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

