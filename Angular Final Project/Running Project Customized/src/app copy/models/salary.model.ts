import { EmployeeModel } from "./employee.model";
import { AdvanceSalaryModel } from "./advance-salary.model";
import { BonusModel } from "./bonus.model";

export class SalaryModel {
  id!: number;
  baseSalary!: EmployeeModel; //(id, employeename, basesalary etc)
  advanceSalary!: AdvanceSalaryModel; //(advancealary)
  bonusAmount!: BonusModel; //(bonusamount)
  insurance!: number;
  medicare!: number;
  overTime!: boolean; //(If Yes then add 1days salary=(baseSalary/4 week /5days))
  fund!: number; // baseSalary * (2% = 0.02)
  netSalary!: number; //(base-advance+bonus+insurance+medicare+overtime-fund)
  date!: string;
}
