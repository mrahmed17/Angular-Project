
import { EmployeeModel } from "./models/employee.model";

export class AttendanceModel {

        id!: string;
        employee?: EmployeeModel;
        checkIn?: Date;
        checkOut?: Date;

}