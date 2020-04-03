import {Component} from '@angular/core';
import {CrudService} from '../services/crud.service';
import { Employee } from '../businessLogic/modelClass';
import {Roles,Customers} from '../businessLogic/roles-customers';
@Component({
    selector :"app-data-table",
    templateUrl:"./data-table.component.html",
    styleUrls:["./data-table.component.css"]
})
export class DataTableComponent
{   rowCount:number;
    class_name:string;
    flag:boolean[]=[];
    roles:Roles[] =[];
    customers:Customers[]=[];
    rowId:string;
    tableIsEditable:boolean = false;
    headers:string[]=["firstname","middlename","lastname","email","phone","rolename","address","customername","Edit","Delete","Select"];
    data_keys:string[] =["firstname","middlename","lastname","email","phone","rolename","address","customername"];
    public data_array:any[]= [];
    public Record:Array<Employee[]> = [];
    constructor(private _service:CrudService)
    {
    }
    ngOnInit()
    {
      this.getData();
      this._service.fetchRoles().subscribe(data => this.roles = data);
      this._service.fetchCustomers().subscribe(data=>this.customers = data);
    }

    getData()
    {
      this.tableIsEditable = false;
      this._service.getData().subscribe(val => {this.data_array=val});
    }
    editData(event,id)
    { 
      this.rowId = id; 
      this.tableIsEditable = true;
     
    }
    saveData($event,id)
    { 
      let empid = id;
      let select_role:HTMLSelectElement = document.getElementById("role2")! as HTMLSelectElement;
      let select_customer:HTMLSelectElement = document.getElementById("customer2")! as HTMLSelectElement;
      let row:HTMLTableRowElement = document.getElementById(id)! as HTMLTableRowElement;
      let firstname = (row.cells[0].childNodes[0] as HTMLInputElement).value;
      let middlename = (row.cells[1].childNodes[0] as HTMLInputElement).value;
      let lastname = (row.cells[2].childNodes[0] as HTMLInputElement).value;
      let email = (row.cells[3].childNodes[0] as HTMLInputElement).value;
      let phone = (row.cells[4].childNodes[0] as HTMLInputElement).value;
      let roleid = (row.cells[5].childNodes[0] as HTMLInputElement).value;
      let address = (row.cells[6].childNodes[0] as HTMLInputElement).value;
      let customerid = (row.cells[7].childNodes[0] as HTMLInputElement).value;  
      let customername = select_customer.options[select_customer.selectedIndex].text;  
      let rolename = select_role.options[select_role.selectedIndex].text;
      let updated = new Employee(firstname,middlename,lastname,email,phone,roleid,address,customerid);
      let updated_obj = {empid,firstname,middlename,lastname,email,phone,rolename,address,customername};
    
      for(let index =0;index<this.data_array.length;index++)
      {
        if(this.data_array[index].empid === id )
        { 
          this.data_array[index] = updated_obj;
          this._service.update(updated,id).subscribe();

        }
      }      
      for(let index =0;index<row.cells.length;index++)
      {
        if(index === 5)
        {
          row.cells[index].innerHTML = select_role.options[select_customer.selectedIndex].text;
          
        }
        else if(index === 7)
        {
          row.cells[index].innerHTML =select_customer.options[select_customer.selectedIndex].text;
        }
        else
        {
          row.cells[index].innerHTML= (row.cells[index].childNodes[0] as HTMLInputElement).value;

        }
      }
      this.tableIsEditable= false;
    }
    deleteData(event,id)
    {
      this._service.delete(id).subscribe(()=>console.log(`deleted user with Id = ${id}`));
      for(let i = 0; i < this.data_array.length; ++i){
        if (this.data_array[i].empid === id) {
            this.data_array.splice(i,1);
        }
    }
    
    }  
    cancelChanges(event,id)
    {
      this.getData();
    }
    multipleDelete()
    {
      let checkBoxArray = document.getElementsByClassName(
        "custom-checkbox"
      ) as HTMLCollectionOf<HTMLInputElement>;
      let RowsToDelete: number[] = [];
      for (let index = 0; index < checkBoxArray.length; index++) {
        if (checkBoxArray[index].checked) {
          let row = checkBoxArray[index].parentNode!
            .parentNode as HTMLTableRowElement;
             RowsToDelete.push(+row.id);
        }
      }
      for (let index = 0; index <= RowsToDelete.length - 1; index++) {
        let row = document.getElementById(
          RowsToDelete[index].toString()
        )! as HTMLTableRowElement;
        row.parentNode!.removeChild(row);
        this._service.delete(row.id).subscribe(()=>console.log(`delete row with id = ${row.id}`));
        }
  }
}
