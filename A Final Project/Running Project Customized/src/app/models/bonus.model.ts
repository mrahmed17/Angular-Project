

import { EmployeeModel } from "./employee.model";

export class BonusModel {
  id!: number;
  employee!: EmployeeModel;
  bonusAmount!: number;
  date!: string;
}
