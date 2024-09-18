export class EmployeeModel {
  id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  departmentId: string; // Department ID where the employee works
  role: 'Admin' | 'Manager' | 'Employee';
  dateOfJoining: Date; // Date when the employee joined
  createdAt: Date; // Creation date of the employee record
  updatedAt: Date; // Last update date of the employee record

  constructor(
    id: string,
    fullName: string,
    email: string,
    contactNumber: string,
    departmentId: string,
    role: 'Admin' | 'Manager' | 'Employee',
    dateOfJoining: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.contactNumber = contactNumber;
    this.departmentId = departmentId;
    this.role = role;
    this.dateOfJoining = dateOfJoining;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Method to update employee details
  updateEmployeeDetails(
    fullName?: string,
    email?: string,
    contactNumber?: string,
    departmentId?: string,
    role?: 'Admin' | 'Manager' | 'Employee'
  ) {
    if (fullName) this.fullName = fullName;
    if (email) this.email = email;
    if (contactNumber) this.contactNumber = contactNumber;
    if (departmentId) this.departmentId = departmentId;
    if (role) this.role = role;
    this.updatedAt = new Date(); // Update the timestamp
  }

  // Method to get employee's full details
  getEmployeeDetails(): string {
    return `${this.fullName} (${this.email}) - Role: ${this.role}`;
  }
}
