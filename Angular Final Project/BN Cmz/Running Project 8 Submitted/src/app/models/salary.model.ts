export class SalaryModel {
  id: string;
  employeeId: string; // ID of the employee
  baseSalary: number; // Base salary amount
  bonus: number; // Bonus amount
  deductions: number; // Total deductions
  netSalary: number; // Net salary after deductions and bonuses
  salaryMonth: Date; // Month for which the salary is calculated
  paymentDate: Date; // Date when the salary was paid

  constructor(
    id: string,
    employeeId: string,
    baseSalary: number,
    bonus: number,
    deductions: number,
    salaryMonth: Date,
    paymentDate: Date
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.baseSalary = baseSalary;
    this.bonus = bonus;
    this.deductions = deductions;
    this.netSalary = this.calculateNetSalary(); // Calculate net salary on initialization
    this.salaryMonth = salaryMonth;
    this.paymentDate = paymentDate;
  }

  // Method to calculate net salary
  calculateNetSalary(): number {
    return this.baseSalary + this.bonus - this.deductions;
  }

  // Method to get salary details
  getSalaryDetails(): string {
    return `Employee ID: ${this.employeeId}, Base Salary: ${
      this.baseSalary
    }, Bonus: ${this.bonus}, Deductions: ${this.deductions}, Net Salary: ${
      this.netSalary
    }, Payment Date: ${this.paymentDate.toDateString()}`;
  }
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
