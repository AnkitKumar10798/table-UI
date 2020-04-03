import { Component, OnInit } from '@angular/core';
import {CrudService} from '../services/crud.service';
import {Roles,Customers} from '../businessLogic/roles-customers';
import {Employee} from '../businessLogic/modelClass';
@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent implements OnInit {
  public roles:Roles[] = [];
  public customers:Customers[] =[];
  submitted = false;
  model=new Employee("Ashleigh","Kayes","Camel","ash@sf.com","9515098235","QA","01","Amazon");
  constructor(private _service:CrudService) { }
  ngOnInit(): void {
    this.getRoles();
    this.getCustomers();
  }
  onSubmit()
  {
    this.submitted = true;
  }
  newEntry()
  {
  
   let customerSelect: HTMLSelectElement = document.getElementById(
    "customer1"
  )! as HTMLSelectElement;
  let roleSelect: HTMLSelectElement = document.getElementById(
    "role1"
  )! as HTMLSelectElement;
   let firstname = (document.getElementById("fname")! as HTMLInputElement)
   .value;
 let middlename = (document.getElementById("mname")! as HTMLInputElement)
   .value;
 let lastname = (document.getElementById("lname")! as HTMLInputElement)
   .value;
 let email = (document.getElementById("email")! as HTMLInputElement).value;
 let phone = (document.getElementById("phone")! as HTMLInputElement).value;
 let roleid =(document.getElementById("role1")! as HTMLSelectElement).value;
 let customerid =(document.getElementById("customer1")! as HTMLSelectElement).value;
 let address = (document.getElementById("address")! as HTMLInputElement).value;
 

  let newEntry = new Employee(firstname,middlename,lastname,email,phone,roleid,address,customerid);
  this.createNewService(newEntry);
  }
  createNewService(row:Employee)
  {
    this._service.create(row).subscribe();
  }
  
  getRoles()
  {
    this._service.fetchRoles().subscribe(data => this.roles=data);
  }
  getCustomers()
  {
    this._service.fetchCustomers().subscribe(data => this.customers = data);
  }

}


