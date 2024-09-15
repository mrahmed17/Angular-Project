

import { EmployeeModel } from './employee.model';

export class AttendanceModel {
  id!: number;
  employee!: EmployeeModel;
  date!: Date;
  clockInTime!: string;
  clockOutTime!: string;
}
