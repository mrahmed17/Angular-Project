export class UserModel {
  id!: string;
  userName!: string;
  fullName!: string;
  email!: string;
  password!: string;
  address!: string;
  gender!: string;
  dateOfBirth!: Date;
  nid!: string;
  contactNumber!: string;
  role!: 'HR' | 'Manager' | 'PayrollAdmin' | 'Employee';
  status!: boolean;
  hourlyRate!: number;
  createAt!: Date;
  updateAt!: Date;
  profilePhoto!: string;
}
