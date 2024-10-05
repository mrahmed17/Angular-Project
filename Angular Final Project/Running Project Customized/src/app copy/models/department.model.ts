
import { BranchModel } from './branch.model';

export class DepartmentModel {
  id!: number;
  name!: string;
  branch!: BranchModel;
  numberOfEmployees!: number;
}
