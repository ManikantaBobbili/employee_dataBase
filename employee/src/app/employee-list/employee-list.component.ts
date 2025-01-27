import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees:Employee[] =[];
  constructor(private employeeService:EmployeeService, private router:Router){}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((res)=>this.employees = res)
    //this will unwrap the observable data and stored in employees list
  }

  deleteEmployee(id:number):void{
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(emp =>emp.id !== id)})
  }

  viewEmployee(id:number):void{
    this.router.navigate([`get/${id}`])
  }

  editEmployee(id:number):void{
    this.router.navigate([`edit/${id}`])
  }
  

}
