import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.css'],
})
export class CreateemployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nidNo: ['', Validators.required],
      contactNumber: ['', Validators.required],
      departmentId: ['', Validators.required],
      managerId: ['Do not need to fill it up.', Validators.required],
      hireDate: [
        { value: new Date().toISOString().slice(0, 16), disabled: true },
        Validators.required,
      ],
      status: [true],
      hourlyRate: [{ value: 250, disabled: true }, Validators.required],
      profilePhoto: [''],
    });

    // Fetch departments from the department service
    this.getDepartments();
  }

  // Fetch the list of departments
  getDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  // Method to handle department change and set the manager accordingly
  onDepartmentChange(): void {
    const selectedDepartmentId = this.employeeForm.get('departmentId')?.value;
    const selectedDepartment = this.departments.find(
      (dept) => dept.id === selectedDepartmentId
    );
    if (selectedDepartment) {
      this.employeeForm.patchValue({
        managerId: selectedDepartment.managerId,
      });
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: EmployeeModel = {
        ...this.employeeForm.value,
        updatedAt: new Date(), // Same as createdAt initially
        id: this.generateEmployeeId(), // Manually generated ID
      };

      this.employeeService.createEmployee(newEmployee).subscribe(
        () => {
          this.router.navigate(['/employees/list']); // Redirect after successful creation
        },
        (error) => {
          console.error('Error creating employee:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to generate employee ID
  generateEmployeeId(): string {
    const username = this.employeeForm.get('username')?.value || '';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `EMP-${username.toUpperCase()}-${randomNum}`;
  }

  // Method to reset the form
  resetForm(): void {
    // Save the current hire date before resetting the form
    const currentHireDate = this.employeeForm.get('hireDate')?.value;

    this.employeeForm.reset({
      username: '',
      fullName: '',
      email: '',
      address: '',
      gender: '',
      dateOfBirth: '',
      nidNo: '',
      contactNumber: '',
      departmentId: '',
      managerId: '',
      status: true,
      hourlyRate: 250,
      profilePhoto: '',
    });

    // Restore the hire date to ensure it remains unchanged
    this.employeeForm.patchValue({
      hireDate: currentHireDate,
    });
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('Error details:', error);
    return throwError(errorMessage);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { EmployeeService } from '../../../services/employee.service';
// import { EmployeeModel } from '../../../models/employee.model';
// import { HttpErrorResponse } from '@angular/common/http';
// import { throwError } from 'rxjs';
// import { DepartmentService } from '../../../services/department.service'; // Import department service

// @Component({
//   selector: 'app-createemployee',
//   templateUrl: './createemployee.component.html',
//   styleUrls: ['./createemployee.component.css'],
// })
// export class CreateemployeeComponent implements OnInit {
//   employeeForm!: FormGroup;
//   departments: any[] = []; // Array to hold the list of departments

//   constructor(
//     private fb: FormBuilder,
//     private employeeService: EmployeeService,
//     private departmentService: DepartmentService, // Inject department service
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Initialize the form
//     this.employeeForm = this.fb.group({
//       username: ['', Validators.required],
//       fullName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       address: ['', Validators.required],
//       contactNumber: ['', Validators.required],
//       departmentId: ['', Validators.required],
//       managerId: ['Do not need to fill it up.', Validators.required],
//       hireDate: [
//         { value: new Date().toISOString().slice(0, 16), disabled: true },
//         Validators.required,
//       ],
//       status: [true],
//       hourlyRate: [{ value: 250, disabled: true }, Validators.required],
//     });

//     // Fetch departments from the department service
//     this.getDepartments();
//   }

//   // Fetch the list of departments
//   getDepartments(): void {
//     this.departmentService.getAllDepartments().subscribe(
//       (data) => {
//         this.departments = data;
//       },
//       (error) => {
//         console.error('Error fetching departments:', error);
//       }
//     );
//   }

//   // Method to handle department change and set the manager accordingly
//   onDepartmentChange(): void {
//     const selectedDepartmentId = this.employeeForm.get('departmentId')?.value;
//     const selectedDepartment = this.departments.find(
//       (dept) => dept.id === selectedDepartmentId
//     );
//     if (selectedDepartment) {
//       this.employeeForm.patchValue({
//         managerId: selectedDepartment.managerId,
//       });
//     }
//   }

//   // Method to handle form submission
//   onSubmit(): void {
//     if (this.employeeForm.valid) {
//       const newEmployee: EmployeeModel = {
//         ...this.employeeForm.value,
//         createdAt: new Date(), // Auto-generated
//         updatedAt: new Date(), // Same as createdAt initially
//         id: this.generateEmployeeId(), // Manually generated ID
//       };

//       this.employeeService.createEmployee(newEmployee).subscribe(
//         () => {
//           this.router.navigate(['/employees/list']); // Redirect after successful creation
//         },
//         (error) => {
//           console.error('Error creating employee:', error);
//         }
//       );
//     } else {
//       console.log('Form is invalid');
//     }
//   }

//   // Method to generate employee ID
//   generateEmployeeId(): string {
//     const username = this.employeeForm.get('username')?.value || '';
//     const randomNum = Math.floor(1000 + Math.random() * 9000);
//     return `EMP-${username.toUpperCase()}-${randomNum}`;
//   }

//   // Method to reset the form
//   resetForm(): void {
//     this.employeeForm.reset({
//       username: '',
//       fullName: '',
//       email: '',
//       address: '',
//       contactNumber: '',
//       departmentId: '',
//       managerId: '',
//       hireDate: new Date().toISOString().slice(0, 16),
//       status: true,
//       hourlyRate: 250,
//     });
//   }

//   // Error handling method
//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'An unknown error occurred!';
//     if (error.error instanceof ErrorEvent) {
//       errorMessage = `Client-side error: ${error.error.message}`;
//     } else {
//       errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.error('Error details:', error);
//     return throwError(errorMessage);
//   }
// }
