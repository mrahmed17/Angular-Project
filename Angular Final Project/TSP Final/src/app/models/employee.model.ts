export class EmployeeModel {   
  id!: number;
  name?: string;
  joiningDate?: string;
  email?: string;
  gender?: string;
  contact?: string;
  salary?: string;
  
  department?: {
      id?: number;
      deptName?: string;
  };
}
