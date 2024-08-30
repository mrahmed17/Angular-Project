import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationModel } from '../../../models/location.model';
import { ManagerModel } from '../../../models/manager.model';
import { DepartmentService } from '../../../services/department.service';
import { DepartmentModel } from '../../../models/department.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createdepartment',
  templateUrl: './createdepartment.component.html',
  styleUrls: ['./createdepartment.component.css'],
})
export class CreatedepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  locations: LocationModel[] = [];
  managers: ManagerModel[] = [];
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      locationId: ['', Validators.required],
      managerId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLocations();
    this.loadManagers();
  }

  loadLocations(): void {
    this.departmentService.getAllLocations().subscribe({
      next: (locations) => (this.locations = locations),
      error: (err) => (this.errorMessage = 'Failed to load locations.'),
    });
  }

  loadManagers(): void {
    this.departmentService.getAllManagers().subscribe({
      next: (managers) => (this.managers = managers),
      error: (err) => (this.errorMessage = 'Failed to load managers.'),
    });
  }

  onSubmit(): void {
    if (this.departmentForm.invalid) {
      return;
    }

    this.loading = true;
    const department: DepartmentModel = this.departmentForm.value;

    this.departmentService.createDepartment(department).subscribe({
      next: (result) => {
        this.loading = false;
        // Redirect to the list page after successful creation
        this.router.navigate(['/departments/list']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to create department.';
      },
    });
  }

  resetForm(): void {
    this.departmentForm.reset();
  }

  cancel(): void {
    this.router.navigate(['/departments/list']);
  }
}
