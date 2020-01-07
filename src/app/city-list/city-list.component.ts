import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from '../services/city.service';
import { StateService } from '../services/state.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { CityViewComponent } from './city-view/city-view.component';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  constructor(private service: CityService,
              private Sservice: StateService,
              private dialog: MatDialog) { }
listdata: MatTableDataSource<any>;
displayedcolumns: string[] = ['statename', 'code', 'description', 'status', 'actions'];
@ViewChild(MatSort, {static: false}) sort: MatSort;
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
searchkey: string;
ngOnInit() {
this.service.getCity().subscribe(
list => {
const array = list.map(item => {
  const statename = this.Sservice.getstateName(item.payload.val().state);
  return {
  $key: item.key,
  statename,
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
dialogconfig.minHeight = '450px';
this.dialog.open(CityViewComponent, dialogconfig);
}
onEdit(row) {
this.service.populate(row);
const dialogconfig = new MatDialogConfig();
dialogconfig.disableClose = true;
dialogconfig.autoFocus = true;
dialogconfig.width = '400px';
this.dialog.open(CityViewComponent, dialogconfig);
}
}
