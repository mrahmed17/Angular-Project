export class PerformanceModel {
  id: string;
  employeeId: string; // ID of the employee
  reviewDate: Date; // Date of the performance review
  rating: number; // Performance rating (1-5)
  comments: string; // Comments on the performance

  constructor(
    id: string,
    employeeId: string,
    reviewDate: Date,
    rating: number,
    comments: string
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.reviewDate = reviewDate;
    this.rating = rating;
    this.comments = comments;
  }

  // Method to get performance summary
  getPerformanceSummary(): string {
    return `Employee ID: ${
      this.employeeId
    }, Review Date: ${this.reviewDate.toDateString()}, Rating: ${
      this.rating
    }, Comments: ${this.comments}`;
  }

  // Method to calculate performance bonus
  calculateBonus(): number {
    // Example: Bonus calculation based on rating
    if (this.rating === 5) return 1000; // Highest rating bonus
    if (this.rating === 4) return 500; // Good rating bonus
    if (this.rating === 3) return 250; // Average rating bonus
    return 0; // No bonus for ratings below 3
  }
}
