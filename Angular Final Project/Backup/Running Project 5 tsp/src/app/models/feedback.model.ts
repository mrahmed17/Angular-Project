export class FeedbackModel {
  id: string;
  employeeId: string; // ID of the employee receiving feedback
  feedback: string; // Feedback text
  performanceRating: number; // Rating for the performance (1-5)
  reviewDate: Date; // Date when the feedback was given

  constructor(
    id: string,
    employeeId: string,
    feedback: string,
    performanceRating: number,
    reviewDate: Date
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.feedback = feedback;
    this.performanceRating = performanceRating;
    this.reviewDate = reviewDate;
  }

  // Method to validate performance rating
  validateRating(): boolean {
    return this.performanceRating >= 1 && this.performanceRating <= 5;
  }

  // Method to get feedback summary
  getFeedbackSummary(): string {
    return `Employee ID: ${this.employeeId}, Rating: ${this.performanceRating}, Feedback: ${this.feedback}`;
  }
}
