import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from '../services/country.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { CountryViewComponent } from './country-view/country-view.component';
import { RegionService } from '../services/region.service';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  constructor(private service: CountryService,
              private Rservice: RegionService,
              private dialog: MatDialog) {
              }
regi = this.Rservice.array;
listdata: MatTableDataSource<any>;
displayedcolumns: string[] = ['regionname', 'code', 'description', 'status', 'actions'];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
searchkey: string;
filterargs = {status: 'true'};
ngOnInit() {
this.service.getCountry().subscribe(
list => {
const array = list.map(item => {
  const regionname = this.Rservice.getregionnName(item.payload.val().region);
  return {
  $key: item.key,
  regionname,
  ...item.payload.val()
};

});
console.log(array);
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
dialogconfig.minHeight = '450px';
this.dialog.open(CountryViewComponent, dialogconfig);
}
onEdit(row) {
this.service.populate(row);
const dialogconfig = new MatDialogConfig();
dialogconfig.disableClose = true;
dialogconfig.autoFocus = true;
dialogconfig.width = '400px';
this.dialog.open(CountryViewComponent, dialogconfig);
}
filterUser(reg) {
  return !reg.status === true;
}
}
