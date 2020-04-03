import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../businessLogic/modelClass';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _url = "http://localhost:3000/crud/fetch";
  private _fetchRolesUrl = "http://localhost:3000/crud/fetchRoles";
  private _fetchCustomersUrl = "http://localhost:3000/crud/fetchCustomers";
  private _updateUrl = "http://localhost:3000/crud/update/";
  private _deleteUrl = "http://localhost:3000/crud/delete/" 
  private _createNewUrl = "http://localhost:3000/crud/createnew";
  constructor(private _apiservice:ApiService,private _http:HttpClient) { }
  create(row:Employee)
  {
    return this._apiservice.create(this._createNewUrl,row);
  }
  getData()
  {
    return this._apiservice.get(this._url);
  }
  update(row:Employee,id)
  {
    return this._apiservice.update(this._updateUrl,row,id);
  }
  delete(id)
  {
    return this._apiservice.delete(this._deleteUrl,id);
  }
  fetchRoles()
  {
    return this._apiservice.getroles(this._fetchRolesUrl);
  }
  fetchCustomers()
  {
    return this._apiservice.getcustomers(this._fetchCustomersUrl);
  }

}
