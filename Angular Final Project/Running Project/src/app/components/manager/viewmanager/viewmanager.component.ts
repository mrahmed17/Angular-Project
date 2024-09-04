import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../services/manager.service';
import { ManagerModel } from '../../../models/manager.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentService } from '../../../services/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewmanager',
  templateUrl: './viewmanager.component.html',
  styleUrls: ['./viewmanager.component.css'],
})
export class ViewmanagerComponent implements OnInit {
  managers: ManagerModel[] = [];
  departments: any[] = []; // Adjust this type according to
  viewManagerForm!: FormGroup;

  loading = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewManagerForm = this.fb.group({
      departmentId: [''],
    });
    // Load departments on component initialization
    this.loadDepartments();

    // Load Managers when department changes
    this.viewManagerForm
      .get('departmentId')
      ?.valueChanges.subscribe((departmentId) => {
        this.errorMessage = null; // Reset error message before loading new data
        this.managers = []; // Clear previous data
        if (departmentId) {
          this.loadManagers(departmentId);
        } else {
          this.managers = [];
        }
      });
  }

  // Load all departments
  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      (departments) => {
        this.departments = departments;
         this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load departments.';
         this.loading = false;
      }
    );
  }

  // Load employees based on selected department
  loadManagers(departmentId: string): void {
     this.loading = true;
    this.managerService.getManagersByDepartment(departmentId).subscribe(
      (managers) => {
        this.managers = managers;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load managers.';
        this.loading = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/managers/list']);
  }
}
