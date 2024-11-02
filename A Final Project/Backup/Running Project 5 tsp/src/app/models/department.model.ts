export class DepartmentModel {
  id: string;
  name: string;
  phoneNumber: string; // Contact phone number for the department
  email: string; // Contact email for the department
  locationId: string; // ID of the location where the department is based
  managerId: string; // ID of the manager responsible for this department
  numberOfEmployees: number; // It will be dynamic

  constructor(
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    locationId: string,
    managerId: string,
    numberOfEmployees: number
  ) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.locationId = locationId;
    this.managerId = managerId;
    this.numberOfEmployees = numberOfEmployees;
  }

  // Method to add a new employee
  addEmployee() {
    this.numberOfEmployees++;
  }

  // Method to remove an employee
  removeEmployee() {
    if (this.numberOfEmployees > 0) {
      this.numberOfEmployees--;
    } else {
      console.warn('No employees to remove.');
    }
  }
}
