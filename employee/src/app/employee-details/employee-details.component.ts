import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit{
  employee!: Employee;
  empId!:any;

  constructor(private employeeService:EmployeeService,private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.empId = this.route.snapshot.paramMap.get('id')!;
    // console.log(this.empId);
    this.getEmployee(this.empId)
  }
  
  getEmployee(empId:number):void{
    // console.log(empId);
    this.employeeService.getEmployee(this.empId).subscribe((res)=>this.employee = res) 
  }

  homePage():void{
    this.router.navigate(['/'])
  }

}
