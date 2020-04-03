import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import {DataTableComponent} from './data-table/data-table.component';
import {NewEntryComponent} from './new-entry/new-entry.component';

const routes:Routes = [{path:'dataTable',component:DataTableComponent},
{path:'newEntry',component:NewEntryComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
export const routingComponents = [DataTableComponent,NewEntryComponent];