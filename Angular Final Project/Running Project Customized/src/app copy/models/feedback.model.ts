import { EmployeeModel } from "./employee.model";

export class FeedbackModel {
  id!: number;
  employee!: EmployeeModel; // id, empname
  rating!: number;
  comment!: string;
  date!: string;
}