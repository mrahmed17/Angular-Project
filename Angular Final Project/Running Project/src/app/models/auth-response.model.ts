

import { EmployeeModel } from './employee.model';
import { UserModel } from './user.model';

export interface AuthResponseModel {
  token: string;
  user: UserModel;
  employee: EmployeeModel;
}
