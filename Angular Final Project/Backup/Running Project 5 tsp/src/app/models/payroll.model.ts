export class PayrollModel {
  id: string;
  employeeId: string; // ID of the employee
  baseSalary: number; // Base salary amount
  bonuses: number; // Total bonuses earned
  deductions: number; // Total deductions
  totalPay: number; // Total pay calculated
  payPeriodStart: Date; // Start date of the pay period
  payPeriodEnd: Date; // End date of the pay period
  paymentDate: Date; // Date when the payment was made

  constructor(
    id: string,
    employeeId: string,
    baseSalary: number,
    bonuses: number,
    deductions: number,
    payPeriodStart: Date,
    payPeriodEnd: Date,
    paymentDate: Date
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.baseSalary = baseSalary;
    this.bonuses = bonuses;
    this.deductions = deductions;
    this.totalPay = this.calculateTotalPay(); // Calculate total pay on initialization
    this.payPeriodStart = payPeriodStart;
    this.payPeriodEnd = payPeriodEnd;
    this.paymentDate = paymentDate;
  }

  // Method to calculate total pay
  calculateTotalPay(): number {
    return this.baseSalary + this.bonuses - this.deductions;
  }

  // Method to get payroll details
  getPayrollDetails(): string {
    return `Employee ID: ${this.employeeId}, Base Salary: ${
      this.baseSalary
    }, Bonuses: ${this.bonuses}, Deductions: ${this.deductions}, Total Pay: ${
      this.totalPay
    }, Payment Date: ${this.paymentDate.toDateString()}`;
  }
}
