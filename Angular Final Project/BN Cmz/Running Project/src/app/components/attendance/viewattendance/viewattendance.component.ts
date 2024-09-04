import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../../../services/attendance.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-viewattendance',
  templateUrl: './viewattendance.component.html',
  styleUrls: ['./viewattendance.component.css'],
})
export class ViewattendanceComponent implements OnInit {
  attendanceForm!: FormGroup;
  attendanceData: any[] = [];
  employeeData: any[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private router: Router
  ) {}

   ngOnInit(): void {
     this.attendanceForm = this.fb.group({
       employee: [''],
     });
     this.loadEmployees();

     this.attendanceForm
       .get('employee')
       ?.valueChanges.subscribe((employeeId) => {
         if (employeeId) {
           this.loadAttendanceByEmployee(employeeId);
         }
       });
   }

   loadEmployees() {
    this.attendanceService.getAllEmployees().subscribe(
      (data) => {
        this.employeeData = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load employees.';
      }
    );
  }

  loadAttendanceByEmployee(employeeId: string) {
    this.attendanceService.getAttendancesByEmployeeId(employeeId).subscribe(
      (data) => {
        this.attendanceData = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load attendance data.';
      }
    );
  }

  backToList(): void {
    this.router.navigate(['/attendances/list']);
  }
}
