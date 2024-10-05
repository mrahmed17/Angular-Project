export class UserModel {
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
  role!: 'HR' | 'Manager' | 'PayrollAdmin';
  status!: boolean;
  createAt!: Date;
  updateAt!: Date;
  profilePhoto!: string;
}
