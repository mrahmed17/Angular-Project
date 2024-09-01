export class EmployeeModel {
  id: string;
  username: string;
  fullName: string;
  email: string;
  address: string;
  contactNumber: string;
  departmentId: string;
  managerId: string;
  hireDate: Date;
  status: boolean;
  hourlyRate: number;
  createdAt: Date;
  updatedAt: Date;
  updateStatus: string;

  constructor(
    id: string,
    username: string,
    fullName: string,
    email: string,
    address: string,
    contactNumber: string,
    departmentId: string,
    managerId: string,
    hireDate: Date,
    status: boolean,
    hourlyRate: number,
    createdAt: Date,
    updatedAt: Date,
    updateStatus: string
  ) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.address = address;
    this.contactNumber = contactNumber;
    this.departmentId = departmentId;
    this.managerId = managerId;
    this.hireDate = hireDate;
    this.status = status;
    this.hourlyRate = hourlyRate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.updateStatus = updateStatus;
  }
}