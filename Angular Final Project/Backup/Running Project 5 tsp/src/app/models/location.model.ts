export class LocationModel {
  id: string;
  name: string;
  address: string;
  contactNumber: string; // Contact phone number for the location
  managerId: string; // ID of the manager responsible for this location
  photo?: string; // Optional photo of the location

  constructor(
    id: string,
    name: string,
    address: string,
    contactNumber: string,
    managerId: string,
    photo?: string
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.contactNumber = contactNumber;
    this.managerId = managerId;
    this.photo = photo;
  }

  // Method to get location details
  getLocationDetails(): string {
    return `${this.name} - Address: ${this.address}, Contact: ${this.contactNumber}`;
  }
}
