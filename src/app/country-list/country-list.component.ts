import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CountryService } from '../services/country.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryViewComponent } from './country-view/country-view.component';
import { RegionService } from '../services/region.service';
import { Router, NavigationEnd } from '@angular/router';
import { DialogservicesService } from '../services/dialogservices.service';
import { NotificationService } from '../services/notification.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countryarray: any;
  listdata: MatTableDataSource<any>;
  displayedcolumns: string[] = ['Region', 'Code', 'Description', 'Active', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchkey: string;
  filterargs = { status: 'true' };
  navigationSubscription;
  RegionArray = [];
  Regioncountryarr;
  constructor(
    private service: CountryService,
    private dialog: MatDialog,
    private router: Router,
    private notifcation: NotificationService,
    private dialogservice: DialogservicesService) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });
  }


  initialiseInvites(){
    this.service.getCountry().subscribe(country =>
      this.countryarray = country
    );
    console.log(this.countryarray);
    this.listdata = new MatTableDataSource(this.countryarray);
    this.listdata.sort = this.sort;
    this.listdata.paginator = this.paginator;
  }


  ngOnInit() {
    this.service.getCountry().subscribe(country =>{
    this.countryarray = country;
    console.log(this.countryarray);
    this.listdata = new MatTableDataSource(this.countryarray);
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
  buttonClick() {
    this.router.navigateByUrl('/country');
}
click(){
  this.router.navigateByUrl("/region");
}


  oncreate() {
    this.service.countryform.reset();
    this.service.initializeForm();
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = '400px';
    dialogconfig.minHeight = '450px';
    this.dialog.open(CountryViewComponent, dialogconfig);
  }
  onEdit(Id) {
    this.service.getCountryById(Id).pipe(debounceTime(1000)).subscribe(country => {this.service.countryform.setValue(country),
    console.log(country);});
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = '400px';
    this.dialog.open(CountryViewComponent, dialogconfig);
  }
  
  ondelete(Id)
  {
    this.dialogservice.openconfirmDialog('Are you sure to delete the Region')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deletecountry(Id).subscribe(res =>{ 
          this.notifcation.delete('Deleted Successfully');
        },
        err => {console.log(err);} );
        
      }
    });
    this.buttonClick();
    this.buttonClick();
    
  }
  filterUser(reg) {
    return !reg.status === true;
  }
}
