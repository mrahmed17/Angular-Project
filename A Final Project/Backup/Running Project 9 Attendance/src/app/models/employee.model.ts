export class EmployeeModel {
  id!: string;
  username!: string;
  fullName!: string;
  email!: string;
  address!: string;
  gender?: string;
  dateOfBirth?: Date;
  nidNo?: string;
  contactNumber!: string;
  departmentId!: string;
  managerId!: string;
  hireDate!: Date; //Creation date will be the hire date
  status!: boolean; //Active or Inactive
  hourlyRate!: number;
  updatedAt!: Date; //For form editation.
  profilePhoto?: string;
}
