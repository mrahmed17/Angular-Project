import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, Subscription, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-editdepartment',
  templateUrl: './editdepartment.component.html',
  styleUrls: ['./editdepartment.component.css'],
})
export class EditdepartmentComponent implements OnInit, OnDestroy {
  // departmentForm!: FormGroup;
  // locations$: Observable<LocationModel[]> = of([]);
  // managers$: Observable<ManagerModel[]> = of([]);
  // departmentId!: string; // Definite assignment assertion
  // private subscription: Subscription = new Subscription();
  // errorMessage: string | null = null;
  // loading: boolean = false;

  // constructor(
  //   private fb: FormBuilder,
  //   private departmentService: DepartmentService,
  //   private locationService: LocationService,
  //   private managerService: ManagerService,
  //   private route: ActivatedRoute,
  //   private router: Router
  // ) {}

   ngOnInit(): void {
  //   // Get departmentId from route parameters
  //   this.departmentId = this.route.snapshot.paramMap.get('id') || '';

  //   // Initialize form with validation
  //   this.departmentForm = this.fb.group({
  //     name: ['', [Validators.required]],
  //     phoneNumber: ['', [Validators.required]],
  //     email: ['', [Validators.required, Validators.email]],
  //     locationId: ['', [Validators.required]],
  //     managerId: ['', [Validators.required]],
  //     numberOfEmployees: [0, [Validators.required, Validators.min(0)]],
  //   });

  //   // Fetch locations and managers for dropdowns
  //   this.locations$ = this.locationService.getLocations();
  //   this.managers$ = this.managerService.getAllManagers();

  //   // Fetch department details and populate the form
  //   this.fetchDepartmentDetails();
  }

  // fetchDepartmentDetails(): void {
  //   this.subscription.add(
  //     this.departmentService
  //       .getDepartmentById(this.departmentId)
  //       .pipe(
  //         map((department) => {
  //           // Populate the form with the current department details
  //           this.departmentForm.patchValue(department);
  //         }),
  //         catchError((error) => {
  //           console.error('Error fetching department details:', error);
  //           this.errorMessage = 'Failed to load department details.';
  //           return of([]); // Return an observable of empty array
  //         })
  //       )
  //       .subscribe()
  //   );
  // }

  // Method to update the department
  // onSubmit(): void {
  //   if (this.departmentForm.valid) {
  //     const updatedDepartment: DepartmentModel = this.departmentForm.value;

  //     this.subscription.add(
  //       this.departmentService
  //         .updateDepartment(this.departmentId, updatedDepartment)
  //         .pipe(
  //           map((department) => {
  //             console.log('Department updated successfully:', department);
  //             this.router.navigate(['/departments/list']); // Redirect to the departments list
  //           }),
  //           catchError((error) => {
  //             console.error('Error updating department:', error);
  //             this.errorMessage = 'Failed to update department.';
  //             return of([]); // Return an observable of empty array
  //           })
  //         )
  //         .subscribe()
  //     );
  //   }
  // }

  // resetForm(): void {
  //   this.fetchDepartmentDetails(); // Re-fetch the department details to reset the form
  // }

  // cancel(): void {
  //   this.router.navigate(['/departments/list']);
  // }

  ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  }
}
