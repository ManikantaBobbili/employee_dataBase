import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employeeForm!: FormGroup;
  constructor(private employeeService:EmployeeService,
              private router:Router,
              private fb:FormBuilder){
                this.employeeForm = this.fb.group({
                  name:["",[Validators.required,Validators.minLength(4)]],
                  department:["",Validators.required],
                  role:["",Validators.required],
                  salary:["",Validators.required],
                  date:["",Validators.required]
                  
                })
              }
  addEmployee():void{
    if(this.employeeForm.valid){
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(() =>
      this.router.navigate([`/`]))
    }
  }
  


  

}
