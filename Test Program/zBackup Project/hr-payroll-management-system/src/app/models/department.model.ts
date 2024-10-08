export class DepartmentModel {
  id!: string; // Primary Key
  departmentName!: string; //Must be provide department name
  description?: string;
  numberOfEmployees?: number; //No of working will show here by declaration
  payrollCalculationMethod!: 'Weekly' | 'Monthly' | 'Yearly';
  overtimeRules!: string; // After finishing the daily work hour

  LocationModel!: {
    locationName: string | undefined;
    addressLine: string | undefined;
    city: string | undefined;
    state: string | undefined;
    postalCode: string | undefined;
    countryName: string | undefined;
  };

  UserModel!: {
    firstName: string;
    lastName: string;
    role: 'HR' | 'Employee' | undefined;
  };
}
