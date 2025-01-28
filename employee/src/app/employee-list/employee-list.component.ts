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
  
  filteredEmployees:Employee[] = [];
  searchText: string = '';
  sortBy: string = 'name'; // Default sorting by title
  isAscending: boolean = true; // Default sorting order is ascending
  employees:Employee[] =[];
  constructor(private employeeService:EmployeeService, private router:Router){}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((res)=>{this.employees = res;
    this.filteredEmployees = [...this.employees];
  });
    
    //this will unwrap the observable data and stored in employees list
  }
  filterEmployees(): void {
    if (this.searchText) {
    this.filteredEmployees = this.employees.filter(
    (emp) =>
    emp.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
    emp.role.toLowerCase().includes(this.searchText.toLowerCase()) ||
    emp.department.toLowerCase().includes(this.searchText.toLowerCase())
    );
    } else {
    this.filteredEmployees = [...this.employees]; // Show all movies if no search text
    }
    this.sortEmployees(); // Reapply sorting after filtering
    }
    // Sort movies by the selected column (title, director, year)
    sortEmployees() : void {
      if(this.sortBy === 'name' || this.sortBy == 'department' || this.sortBy == ''){
        this.filteredEmployees.sort((a:any,b:any)=>{
          if(this.isAscending){
            return a[this.sortBy].localeCompare(b[this.sortBy]);
          }else{
            return b[this.sortBy].localeCompare(a[this.sortBy]);
          }
        })
      }else{
      this.filteredEmployees.sort((a:any,b:any)=>{
        if(this.isAscending){
          return (a[this.sortBy] < b[this.sortBy]) ? -1 : 1;
        }else{
          return (b[this.sortBy] < a[this.sortBy]) ? -1 : 1;
        }
      }) 
    }
    }
  
    toggleOrder() : void {
      this.isAscending = !this.isAscending;
      this.sortEmployees();
    }

  deleteEmployee(id:number):void{
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.filteredEmployees = this.filteredEmployees.filter(emp =>emp.id !== id)})
  }

  viewEmployee(id:number):void{
    this.router.navigate([`get/${id}`])
  }

  editEmployee(id:number):void{
    this.router.navigate([`edit/${id}`])
  }
  

}
