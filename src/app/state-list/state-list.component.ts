import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../services/state.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryService } from '../services/country.service';
import { StateViewComponent } from './state-view/state-view.component';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements OnInit {

  constructor(private service: StateService,
              private Cservice: CountryService,
              private dialog: MatDialog) { }
listdata: MatTableDataSource<any>;
displayedcolumns: string[] = ['countryname', 'code', 'description', 'status', 'actions'];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
searchkey: string;
ngOnInit() {
this.service.getstate().subscribe(
list => {
const array = list.map(item => {
const countryname = this.Cservice.getcountryName(item.payload.val().country);
return {
$key: item.key,
countryname,
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
this.dialog.open(StateViewComponent, dialogconfig);
}
onEdit(row) {
this.service.populate(row);
const dialogconfig = new MatDialogConfig();
dialogconfig.disableClose = true;
dialogconfig.autoFocus = true;
dialogconfig.width = '400px';
this.dialog.open(StateViewComponent, dialogconfig);
}
}
