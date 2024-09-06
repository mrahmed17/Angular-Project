

import { EmployeeModel } from "./employee.model";

export class AdvanceSalaryModel {
  id!: number;
  employee!: EmployeeModel;
  advanceSalary!: number;
  reason!: string;
  date!: string;
}
