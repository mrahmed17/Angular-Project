export class VerificationModel {
  id: string;
  employeeId: string; // ID of the employee
  verificationDate: Date; // Date when the verification was performed
  verifiedBy: string; // Person or system who verified
  status: 'Pending' | 'Approved' | 'Rejected'; // Verification status
  comments: string; // Additional comments on the verification

  constructor(
    id: string,
    employeeId: string,
    verificationDate: Date,
    verifiedBy: string,
    status: 'Pending' | 'Approved' | 'Rejected',
    comments: string
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.verificationDate = verificationDate;
    this.verifiedBy = verifiedBy;
    this.status = status;
    this.comments = comments;
  }

  // Method to get verification details
  getVerificationDetails(): string {
    return `Employee ID: ${
      this.employeeId
    }, Verification Date: ${this.verificationDate.toDateString()}, Verified By: ${
      this.verifiedBy
    }, Status: ${this.status}, Comments: ${this.comments}`;
  }
}
