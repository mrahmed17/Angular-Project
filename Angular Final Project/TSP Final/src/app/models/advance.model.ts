import { EmployeeModel } from "./employee.model";

export class Advance{
    id!:number;
    employee!: EmployeeModel
    amount?: number;
    reason?: string;
    date?: Date; 

}