export class FeedbackModel {
  id!: string;
  employeeId!: string; // ID of the employee receiving the feedback
  managerId!: string; // ID of the manager providing the feedback
  performanceRating!: number; // Rating given by the manager (e.g., 1-5)
  comments!: string; // Detailed comments or feedback
  date!: Date; // Date when the feedback was given

  // Method to update feedback details
  updateFeedback(performanceRating: number, comments: string) {
    this.performanceRating = performanceRating;
    this.comments = comments;
  }

  // Method to get feedback details as a string
  getFeedbackDetails(): string {
    return `Feedback ID: ${this.id}\nEmployee ID: ${
      this.employeeId
    }\nManager ID: ${this.managerId}\nRating: ${
      this.performanceRating
    }\nComments: ${this.comments}\nDate: ${this.date.toDateString()}`;
  }
}
export interface Employee {
  id: string;
  name: string;
}

export interface Manager {
  id: string;
  fullName: string;
}
