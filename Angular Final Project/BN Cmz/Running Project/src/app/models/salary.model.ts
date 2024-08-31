import { EmployeeModel } from './employee.model';

export class Salary {
  id!: number;
  employee?: EmployeeModel;
  amount?: number; // Base salary
  totalSalary?: number; // Total salary after calculations
  date?: string;
  empBonus?: number;
  empAdvance?: number;
  totalHours?: number; // Total worked hours for payment calculation
}

// // Example function to calculate salary based on hours worked
// calculateSalary(employeeId: number, dateRange: { start: string, end: string }): Observable<number> {
//     return this.attendanceService.getAttendanceByDateRange(dateRange.start, dateRange.end)
//         .pipe(
//             map(attendances => {
//                 const totalHours = attendances.reduce((sum, attendance) => sum + (attendance.totalHours || 0), 0);
//                 // Assume hourly rate or salary calculation logic here
//                 const hourlyRate = 20; // Example hourly rate
//                 return totalHours * hourlyRate;
//             })
//         );
// }
