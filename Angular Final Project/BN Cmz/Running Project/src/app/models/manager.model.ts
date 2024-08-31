export class ManagerModel {
  id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  departmentId: string; // Department ID where the manager works
  role: 'Manager'; // Role should be 'Manager'
  dateOfJoining: Date; // Date when the manager joined
  createdAt: Date; // Creation date of the manager record
  updatedAt: Date; // Last update date of the manager record

  constructor(
    id: string,
    fullName: string,
    email: string,
    contactNumber: string,
    departmentId: string,
    role: 'Manager',
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

  // Method to update manager details
  updateManagerDetails(
    fullName?: string,
    email?: string,
    contactNumber?: string,
    departmentId?: string
  ) {
    if (fullName) this.fullName = fullName;
    if (email) this.email = email;
    if (contactNumber) this.contactNumber = contactNumber;
    if (departmentId) this.departmentId = departmentId;
    this.updatedAt = new Date(); // Update the timestamp
  }

  // Method to get manager's full details
  getManagerDetails(): string {
    return `${this.fullName} (${this.email}) - Role: ${this.role}`;
  }
}
