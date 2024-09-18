import { UserModel } from './user.model';

export class AttendanceModel {
  id!: string;
  user!: UserModel;
  date!: Date;
  clockInTime!: string | null; // null if not clocked in yet
  clockOutTime!: Date | null; // null if not clocked out yet
  totalHours!: number; // Total hours worked
  status!: 'Present' | 'Absent' | 'Leave'; // Status of the attendance
}
