import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {  MatGridListModule } from '@angular/material/grid-list';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import {  MatSlideToggleModule } from '@angular/material/slide-toggle';
import {  MatCardModule } from '@angular/material/card';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import {  MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon';
import {  MatSortModule } from '@angular/material/sort';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {  MatDialogModule } from '@angular/material/dialog';
import {  MatMenuModule } from '@angular/material/menu';
import {  MatBadgeModule } from '@angular/material/badge';
import {  MatSidenavModule } from '@angular/material/sidenav';
import {  MatListModule } from '@angular/material/list';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
@NgModule({ 
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  MatSlideToggleModule,
  MatCardModule,
  MatSnackBarModule,
  MatTableModule,
  MatIconModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatBadgeModule,
  MatCardModule
  ],
  exports: [
    MatGridListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
  MatDialogModule,
 MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
 MatListModule,
  MatButtonModule,
  MatBadgeModule,
  MatCardModule
   ]
})
export class MaterialModule { }
