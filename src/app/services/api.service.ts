import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../businessLogic/modelClass';
import {Roles,Customers} from '../businessLogic/roles-customers';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  create(url,row):Observable<Employee>
  {
    return  this.http.post<Employee>(url,row,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
  }
  get(url):Observable<Employee[]>
  {
    return this.http.get<Employee[]>(url);
  }
  update(url,row:Employee,id):Observable<Employee>
  {
    return this.http.put<Employee>(url+`${id}`,row,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }
  delete(url,id):Observable<void>
  {
    return this.http.delete<void>(url+`${id}`);
  }
  getroles(url):Observable<Roles[]>
  {
    return this.http.get<Roles[]>(url);
  }  
  getcustomers(url):Observable<Customers[]>
  {
    return this.http.get<Customers[]>(url);
  }
 
  }

