import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../../services/manager.service';
import { ManagerModel } from '../../../models/manager.model';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-editmanager',
  templateUrl: './editmanager.component.html',
  styleUrls: ['./editmanager.component.css'],
})
export class EditmanagerComponent implements OnInit {
  managerForm!: FormGroup;
  managerId: string | null = null;
  departments: any[] = [];

  submissionError: string | null = null;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get managerId from route parameters
    this.managerId = this.route.snapshot.paramMap.get('id') || '';

    // Initialize form
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
      hireDate: [{ value: '', disabled: true }, Validators.required], // Hire date should not be changeable
      status: [true],
      hourlyRate: [{ value: 250, disabled: true }, Validators.required],
      profilePhoto: [''],
    });

    // Fetch manager details
    this.loadManager();

    // Fetch departments from the department service
    this.getDepartments();
  }

  loadManager(): void {
    if (this.managerId) {
      this.managerService.getManagerById(this.managerId).subscribe(
        (manager: ManagerModel) => {
          const hireDate = manager.hireDate
            ? new Date(manager.hireDate).toISOString().substring(0, 16)
            : '';
          this.managerForm.patchValue({
            ...manager,
            hireDate: hireDate,
            updatedAt: new Date(manager.updatedAt).toISOString(),
          });
        },
        (error) => {
          console.error('Error fetching manager details:', error);
        }
      );
    }
  }

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

  onDepartmentChange(): void {
    const selectedDepartmentId = this.managerForm.get('departmentId')?.value;
    const selectedDepartment = this.departments.find(
      (dept) => dept.id === selectedDepartmentId
    );
    if (selectedDepartment) {
      this.managerForm.patchValue({
        locationId: selectedDepartment.locationId,
      });
    }
  }

  onSubmit(): void {
    if (this.managerForm.invalid) {
      const updatedManager: ManagerModel = {
        ...this.managerForm.value,
        updatedAt: new Date(), // Set updatedAt to current date/time
        hireDate: new Date(this.managerForm.value.hireDate), // Convert back to Date object
      };

      this.managerService
        .updateManager(this.managerId as string, updatedManager)
        .subscribe(
          () => {
            this.router.navigate(['/managers/list']);
          },
          (error) => {
            this.submissionError =
              'Failed to update manager. Please try again.';
            console.error('Update Manager Error:', error);
          }
        );
    }
  }

  resetForm(): void {
    this.loadManager();
  }

  cancel(): void {
    this.router.navigate(['/managers/list']);
  }
}
