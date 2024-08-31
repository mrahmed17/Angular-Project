import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { FeedbackModel } from '../../../models/feedback.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editfeedback',
  templateUrl: './editfeedback.component.html',
  styleUrls: ['./editfeedback.component.css'],
})
export class EditfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  feedbackId: string;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
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
      date: ['', Validators.required],
    });
    this.feedbackId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback() {
    this.loading = true;
    this.feedbackService.getFeedback(this.feedbackId).subscribe(
      (feedback: FeedbackModel) => {
        this.feedbackForm.patchValue(feedback);
        this.loading = false;
      },
      (error) => {
        this.errorMessage =
          error.message || 'An error occurred while loading the feedback.';
        this.loading = false;
      }
    );
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.loading = true;
      const feedback: FeedbackModel = this.feedbackForm.value;

      this.feedbackService.updateFeedback(this.feedbackId, feedback).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/feedbacks']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage =
            error.message || 'An error occurred while updating the feedback.';
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/feedbacks']);
  }
}
