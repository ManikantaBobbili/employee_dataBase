import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  empId!: any;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
      
    });
  }

  ngOnInit(): void {
    this.empId = this.route.snapshot.paramMap.get('id')!;
      this.employeeService.getEmployee(this.empId).subscribe((employee: Employee) => {
        this.employeeForm.patchValue(employee);
      });
  }

  editEmployee(): void {
    if (this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.empId,this.employeeForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
