export class AttendanceModel {
  id!: string; // Attendance ID
  date!: Date; // Date of attendance
  status!: 'Present' | 'Absent' | 'On Leave'; // Restricting status to specific values and base on check in or out time
  checkInTime!: string; // Check-in time
  checkOutTime!: string; // Check-out time

  UserModel!: {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    role: 'HR' | 'Employee' | undefined;
    profilePhoto: string | undefined;
  };
}
