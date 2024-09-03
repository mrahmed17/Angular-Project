import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DepartmentService } from '../../../services/department.service';
import { LocationService } from '../../../services/location.service';
import { ManagerService } from '../../../services/manager.service';
import { DepartmentModel } from '../../../models/department.model';
import { ManagerModel } from '../../../models/manager.model';
import { LocationModel } from '../../../models/location.model';

@Component({
  selector: 'app-createdepartment',
  templateUrl: './createdepartment.component.html',
  styleUrls: ['./createdepartment.component.css'],
})
export class CreatedepartmentComponent implements OnInit {
  departmentForm!: FormGroup; // Ensure that the form is initialized properly
  locations$: Observable<LocationModel[]> = of([]); // Initialize with an empty observable
  managers$: Observable<ManagerModel[]> = of([]); // Initialize with an empty observable
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private locationService: LocationService,
    private managerService: ManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form with validation
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      locationId: ['', [Validators.required]],
      // managerId: ['', [Validators.required]],
      numberOfEmployees: [0, [Validators.required, Validators.min(0)]],
    });

    // Fetch locations and managers for dropdowns using forkJoin
    forkJoin({
      locations: this.locationService.getLocations(),
      managers: this.managerService.getAllManagers(),
    }).subscribe({
      next: ({ locations, managers }) => {
        this.locations$ = of(locations);
        this.managers$ = of(managers);
      },
      error: (error) => {
        console.error('Error fetching locations or managers:', error);
        this.errorMessage = 'Failed to load locations or managers.';
      },
    });
  }

  // Method to create a new department
  onSubmit(): void {
    if (this.departmentForm.valid) {
      const newDepartment: DepartmentModel = this.departmentForm.value;

      this.departmentService
        .createDepartment(newDepartment)
        .pipe(
          map((department) => {
            console.log('Department created successfully:', department);
            this.router.navigate(['/departments/list']); // Redirect to the departments list
          }),
          catchError((error) => {
            console.error('Error creating department:', error);
            this.errorMessage = 'Failed to create department.';
            return of(null);
          })
        )
        .subscribe();
    }
  }

  // Method to generate employee ID
  generateDepartmentId(): string {
    const name = this.departmentForm.get('name')?.value || '';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `DEP-${name.toUpperCase()}-${randomNum}`;
  }

  resetForm(): void {
    this.departmentForm.reset();
  }

  cancel(): void {
    this.router.navigate(['/departments/list']);
  }
}
