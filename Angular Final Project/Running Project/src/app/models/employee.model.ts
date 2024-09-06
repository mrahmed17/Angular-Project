import { DepartmentModel } from "./department.model";

export class EmployeeModel {
  id!: number;
  userName!: string;
  fullName!: string;
  email!: string;
  password!: string;
  address!: string;
  gender!: string;
  dateOfBirth!: Date;
  nid!: string;
  contactNumber!: string;
  department!: DepartmentModel; //(branch)
  role!: 'Employee'; // For auth and role
  joiningDate!: string;
  status!: boolean;
  baseSalary!: number;
  createAt!: Date;
  updatedAt!: Date;
  profilePhoto?: string;
}
