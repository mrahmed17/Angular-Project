export class EmployeeModel {
  id!: string;
  username!: string;
  fullName!: string;
  email!: string;
  address!: string;
  gender?: string;
  age?: number;
  nidNo?: string;
  contactNumber!: string;
  departmentId!: string;
  managerId!: string;
  hireDate!: Date;
  status!: boolean;
  hourlyRate!: number;
  createdAt!: Date;
  updatedAt!: Date;
  updateStatus!: string;
  profilePhoto?: string;
  department?: string;
}
