import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = "https://glowing-disco-xx496g7rv47265gp-3000.app.github.dev/employees/"; // take from json url

  constructor(private http: HttpClient) { } //  http used for calling backend request like get,post,put delete request


  // Return all the employees 
  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl);
  }

  //Return employee by id
  getEmployee(id:any): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}${id}`);
  }


  //Create in employee in the dataBase
  createEmployee(employee:Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl,employee);
  }

  // Update the existing employee Data
  updateEmployee(id:number,employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}${id}`,employee);
  }

  //delete the existing employee
  deleteEmployee(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}${id}`)
  }
}
