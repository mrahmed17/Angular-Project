import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerformanceService } from '../../../services/performance.service';
import { PerformanceModel } from '../../../models/performance.model';

@Component({
  selector: 'app-editperformance',
  templateUrl: './editperformance.component.html',
  styleUrls: ['./editperformance.component.css'],
})
export class EditperformanceComponent {
  
  // implements OnInit {
  // performanceForm: FormGroup;
  // submitting = false;
  // errorMessage: string | null = null;
  // performanceId: string = '';

  // constructor(
  //   private fb: FormBuilder,
  //   private performanceService: PerformanceService,
  //   private router: Router,
  //   private route: ActivatedRoute
  // ) {
  //   this.performanceForm = this.fb.group({
  //     employeeId: ['', Validators.required],
  //     managerId: ['', Validators.required],
  //     goals: [false],
  //     achievements: ['', Validators.required],
  //     reviewDate: [{ value: '', disabled: true }, Validators.required], // Disabled field
  //     rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
  //     comments: [''],
  //     bonusPercentage: [0, [Validators.required, Validators.min(0)]],
  //   });
  // }

  // ngOnInit(): void {
  //   this.performanceId = this.route.snapshot.paramMap.get('id')!;
  //   this.loadPerformance();
  // }

  // loadPerformance(): void {
  //   this.performanceService.getPerformance(this.performanceId).subscribe({
  //     next: (performance) => {
  //       this.performanceForm.patchValue({
  //         employeeId: performance.employeeId,
  //         managerId: performance.managerId,
  //         goals: performance.goals,
  //         achievements: performance.achievements,
  //         reviewDate: performance.reviewDate,
  //         rating: performance.rating,
  //         comments: performance.comments,
  //         bonusPercentage: performance.bonusPercentage,
  //       });
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Failed to load performance record.';
  //       console.error('Error loading performance record', error);
  //     },
  //   });
  // }

  // onSubmit(): void {
  //   if (this.performanceForm.valid) {
  //     this.submitting = true;
  //     const updatedPerformance: PerformanceModel = {
  //       id: this.performanceId, // Ensure ID is included for the update
  //       ...this.performanceForm.value,
  //       reviewDate: new Date(this.performanceForm.get('reviewDate')?.value), // Ensure reviewDate is a Date object
  //     };

  //     this.performanceService
  //       .updatePerformance(this.performanceId, updatedPerformance)
  //       .subscribe({
  //         next: () => {
  //           this.submitting = false;
  //           this.router.navigate(['/performances/list']);
  //         },
  //         error: (error) => {
  //           this.submitting = false;
  //           this.errorMessage = 'Failed to update performance record.';
  //           console.error('Error updating performance record', error);
  //         },
  //       });
  //   }
  // }

  // onCancel(): void {
  //   this.router.navigate(['/performances/list']);
  // }
}
