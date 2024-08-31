import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';
import { FeedbackModel } from '../../../models/feedback.model';

@Component({
  selector: 'app-createfeedback',
  templateUrl: './createfeedback.component.html',
  styleUrl: './createfeedback.component.css',
})
export class CreatefeedbackComponent {
  feedbackForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router
  ) {
    this.feedbackForm = this.fb.group({
      employeeId: ['', Validators.required],
      managerId: ['', Validators.required],
      performanceRating: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      comments: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.loading = true;
      const feedback: FeedbackModel = this.feedbackForm.value;

      this.feedbackService.createFeedback(feedback).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/feedbacks']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage =
            error.message || 'An error occurred while creating the feedback.';
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/feedbacks']);
  }
}
