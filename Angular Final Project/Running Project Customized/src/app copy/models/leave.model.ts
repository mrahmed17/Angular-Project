import { EmployeeModel } from "./employee.model";

export class LeaveModel {
  id!: number;
  employee!: EmployeeModel; // id, empname, contact
  leaveReason!: 'Reserve' | 'Sick';
  startDate!: Date;
  endDate!: Date;
  remainingLeave!: number; // Total 25 days: (Reserve 10 + sick 15);  reamining: (total - (end - start))
  requestDate!: Date;
  isGrant!: boolean;
}
