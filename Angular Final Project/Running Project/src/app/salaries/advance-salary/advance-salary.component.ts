import { Component, OnInit } from '@angular/core';
import { AdvanceSalaryModel } from '../../models/advance-salary.model';
import { AdvanceSalaryService } from '../../services/advance-salary.service';

@Component({
  selector: 'app-advance-salary',
  templateUrl: './advance-salary.component.html',
  styleUrl: './advance-salary.component.css',
})
export class AdvanceSalaryComponent implements OnInit {
  advanceSalaries: AdvanceSalaryModel[] = [];

  constructor(private advanceSalaryService: AdvanceSalaryService) {}

  ngOnInit(): void {
    this.advanceSalaryService.getAdvanceSalaryByEmployeeId(1).subscribe(
      (data) => {
        this.advanceSalaries = data;
      },
      (error) => {
        console.error('Error fetching advance salary requests:', error);
      }
    );
  }

 
  requestAdvanceSalary(): void {
    const newAdvanceSalary: AdvanceSalaryModel = {
      id: 0, 
      employee: { id: 1, fullName: 'John Doe', ...otherDetails }
      advanceSalary: 5000,
      reason: 'Medical Emergency',
      date: new Date().toISOString(),
    };

    this.advanceSalaryService.requestAdvanceSalary(newAdvanceSalary).subscribe(
      (response) => {
        console.log('Advance salary requested successfully:', response);       
      },
      (error) => {
        console.error('Error requesting advance salary:', error);
      }
    );
  }
}
