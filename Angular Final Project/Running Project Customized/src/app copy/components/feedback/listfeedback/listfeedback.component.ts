import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { FeedbackModel } from '../../../models/feedback.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listfeedback',
  templateUrl: './listfeedback.component.html',
  styleUrls: ['./listfeedback.component.css'],
})
export class ListfeedbackComponent implements OnInit {
  feedbacks: FeedbackModel[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.feedbackService.getFeedbacks().subscribe(
      (feedbacks: FeedbackModel[]) => {
        this.feedbacks = feedbacks;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load feedbacks.';
        this.loading = false;
        console.error('Failed to load feedbacks', error);
      }
    );
  }

  viewFeedback(id: string): void {
    this.router.navigate([`/feedbacks/view/${id}`]);
  }

  editFeedback(id: string): void {
    this.router.navigate([`/feedbacks/edit/${id}`]);
  }

  deleteFeedback(id: string): void {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.feedbackService.deleteFeedback(id).subscribe(
        () => {
          this.loadFeedbacks(); // Refresh the list after deletion
        },
        (error) => {
          this.errorMessage = 'Failed to delete feedback.';
          console.error('Failed to delete feedback', error);
        }
      );
    }
  }
}
