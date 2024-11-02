export class VerificationModel {
  id!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  role!: 'Admin' | 'Manager' | 'Employee';
}
