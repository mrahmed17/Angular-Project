import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from '../../models/employee.model';
import { DepartmentModel } from '../../models/department.model';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: EmployeeModel[] = [];
  departments: DepartmentModel[] = [];
  employeeForm!: FormGroup;
  selectedEmployeeId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.initEmployeeForm();
    this.loadDepartments();
  }

  private loadEmployees() {
    this.employeeService.getAllEmployee().subscribe(
      (data) => (this.employees = data),
      (error) => console.error('Error fetching employees', error)
    );
  }

  private loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      (data) => (this.departments = data),
      (error) => console.error('Error fetching departments', error)
    );
  }

  private initEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      joiningDate: [''],
      email: ['', [Validators.email, Validators.required]],
      gender: [''],
      contact: [''],
      salary: [''],
      department: [''],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: EmployeeModel = this.employeeForm.value;
      this.employeeService.employeePost(employeeData).subscribe(
        (response) => {
          console.log('Employee created successfully', response);
          this.loadEmployees(); // Refresh the list of employees after creation
          this.employeeForm.reset(); // Reset the form
        },
        (error) => {
          console.error('Error creating employee', error);
          alert('Error creating employee. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (response) => {
          console.log('Employee deleted successfully', response);
          alert('Employee Deleted');
          this.loadEmployees(); // Refresh the list of employees after deletion
        },
        (error) => {
          console.error('Error deleting employee', error);
          alert('Error deleting employee. Please try again.');
        }
      );
    }
  }

  onEdit(row: EmployeeModel) {
    this.selectedEmployeeId = row.id; // Set the selected employee ID
    this.employeeForm.patchValue({
      name: row.name,
      joiningDate: row.joiningDate,
      email: row.email,
      gender: row.gender,
      contact: row.contact,
      salary: row.salary,
      department: row.department,
    });
  }

  updateEmployee() {
    if (this.selectedEmployeeId !== null) {
      const employeeData: EmployeeModel = this.employeeForm.value;
      this.employeeService
        .editEmployee(this.selectedEmployeeId, employeeData)
        .subscribe(
          (response) => {
            console.log('Employee updated successfully', response);
            this.loadEmployees();
            this.employeeForm.reset(); // Reset the form
            this.selectedEmployeeId = null; // Reset the selected employee ID
          },
          (error) => {
            console.error('Error updating employee', error);
            alert('Error updating employee. Please try again.');
          }
        );
    } else {
      console.error('No employee selected for update');
    }
  }

  resetForm() {
    this.employeeForm.reset(); // Reset the form fields to their initial empty state
    this.selectedEmployeeId = null; // Reset the selected employee ID
  }
}
