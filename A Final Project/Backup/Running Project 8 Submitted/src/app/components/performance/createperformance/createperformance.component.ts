import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerformanceService } from '../../../services/performance.service';
import { PerformanceModel } from '../../../models/performance.model';

@Component({
  selector: 'app-createperformance',
  templateUrl: './createperformance.component.html',
  styleUrls: ['./createperformance.component.css'],
})
export class CreateperformanceComponent {
  performanceForm: FormGroup;
  submitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private performanceService: PerformanceService,
    private router: Router
  ) {
    this.performanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      managerId: ['', Validators.required],
      goals: [false],
      achievements: [false],
      reviewDate: [new Date(), Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      comments: [''],
      bonusPercentage: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.performanceForm.valid) {
      this.submitting = true;
      const performance: PerformanceModel = {
        ...this.performanceForm.value,
        reviewDate: new Date(), // Automatically set to current date
      };

      this.performanceService.createPerformance(performance).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/performances/list']);
        },
        error: (error) => {
          this.submitting = false;
          this.errorMessage = 'Failed to create performance record.';
          console.error('Error creating performance record', error);
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/performances/list']);
  }
}
