export class LeaveModel {
  id: string;
  employeeId: string; // ID of the employee on leave
  leaveType: 'Sick' | 'Casual' | 'Annual'; // Type of leave
  startDate: Date; // Leave start date
  endDate: Date; // Leave end date
  leaveDuration: number; // Duration of leave in days
  reason: string; // Reason for the leave

  constructor(
    id: string,
    employeeId: string,
    leaveType: 'Sick' | 'Casual' | 'Annual',
    startDate: Date,
    endDate: Date,
    leaveDuration: number,
    reason: string
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.leaveType = leaveType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.leaveDuration = leaveDuration;
    this.reason = reason;
  }

  // Method to calculate leave duration
  calculateLeaveDuration() {
    const diffInMillis = this.endDate.getTime() - this.startDate.getTime();
    this.leaveDuration = Math.floor(diffInMillis / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  }

  // Method to get leave details
  getLeaveDetails(): string {
    return `Employee ID: ${this.employeeId}, Leave Type: ${this.leaveType}, Duration: ${this.leaveDuration} days, Reason: ${this.reason}`;
  }
}
