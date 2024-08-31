import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationModel } from '../../../models/location.model';
import { ManagerModel } from '../../../models/manager.model';
import { DepartmentService } from '../../../services/department.service';
import { DepartmentModel } from '../../../models/department.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editdepartment',
  templateUrl: './editdepartment.component.html',
  styleUrls: ['./editdepartment.component.css'],
})
export class EditdepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  locations: LocationModel[] = [];
  managers: ManagerModel[] = [];
  errorMessage: string | null = null;
  loading: boolean = false;
  departmentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.departmentId = this.route.snapshot.paramMap.get('id'); // Retrieve the department ID from route
    if (this.departmentId) {
      this.loadDepartment(this.departmentId);
    }
    this.loadLocations();
    this.loadManagers();
  }

  loadDepartment(id: string): void {
    this.departmentService.getDepartmentById(id).subscribe({
      next: (department) => {
        this.departmentForm.patchValue(department);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load department details.';
      },
    });
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
    const department: Partial<DepartmentModel> = this.departmentForm.value;

    if (this.departmentId) {
      this.departmentService
        .updateDepartment(this.departmentId, department)
        .subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/departments/list']);
          },
          error: (err) => {
            this.loading = false;
            this.errorMessage = 'Failed to update department.';
          },
        });
    }
  }

  resetForm(): void {
    if (this.departmentId) {
      this.loadDepartment(this.departmentId); // Reload the department details
    }
  }

  cancel(): void {
    this.router.navigate(['/departments/list']);
  }
}
