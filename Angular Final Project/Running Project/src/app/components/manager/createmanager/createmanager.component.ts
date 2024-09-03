import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ManagerService } from '../../../services/manager.service';
import { ManagerModel } from '../../../models/manager.model';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-createmanager',
  templateUrl: './createmanager.component.html',
  styleUrls: ['./createmanager.component.css'],
})
export class CreatemanagerComponent implements OnInit {
  managerForm!: FormGroup;
  departments: any[] = [];
  submissionError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.managerForm = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nidNo: ['', Validators.required],
      contactNumber: ['', Validators.required],
      departmentId: ['', Validators.required],
      hireDate: [
        { value: new Date().toISOString().slice(0, 16), disabled: true },
        Validators.required,
      ],
      status: [true, Validators.required],
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
    const selectedDepartmentId = this.managerForm.get('departmentId')?.value;
    const selectedDepartment = this.departments.find(
      (dept) => dept.id === selectedDepartmentId
    );
    if (selectedDepartment) {
      this.managerForm.patchValue({
        managerId: selectedDepartment.managerId,
      });
    }
  }

  onSubmit(): void {
    if (this.managerForm.valid) {
      const newManager: ManagerModel = {
        ...this.managerForm.value,
        updatedAt: new Date(), // Same as createdAt initially
        id: this.generateManagerId(), // Manually generated ID
      };
      this.managerService.createManager(newManager).subscribe(
        () => {
          this.router.navigate(['/managers/list']); // Redirect after successful creation
        },
        (error) => {
          console.error('Error creating manager:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to generate a unique manager ID
  generateManagerId(): string {
    const username = this.managerForm.get('username')?.value || '';
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    return `MNG-${username.toUpperCase()}-${randomNumber}`;
  }

  resetForm(): void {
    // Save the current hire date before resetting the form
    const currentHireDate = this.managerForm.get('hireDate')?.value;
    this.managerForm.reset({
      username: '',
      fullName: '',
      email: '',
      address: '',
      gender: '',
      dateOfBirth: '',
      nidNo: '',
      contactNumber: '',
      departmentId: '',
      status: true,
      hourlyRate: 250,
      profilePhoto: '',
    });
    // Reset to default values if necessary
    this.managerForm.patchValue({
      hireDate: currentHireDate,
    });
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  cancel(): void {
    this.router.navigate(['/managers/list']);
  }
}
