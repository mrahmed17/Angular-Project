import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DepartmentModel } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}
  // baseUrl:string="http://localhost:8086/api/department/";
  private baseUrl = 'http://localhost:3000/department';

  // departmentPost(data:any){
  //   return this.http.post<any>(this.baseUrl,data)
  //   .pipe(map(res=>{
  //     return res;
  //   }))
  // }

  // getAllDepartments(){
  //   return this.http.get<any>(this.baseUrl)
  //   .pipe(map(res=>{
  //     return res;
  //   }))
  // }
  // editDepartment(id:number, row:any){
  //   return this.http.put<any>(this.baseUrl+id,row)
  //   .pipe(map(
  //     (res=>{
  //       return res;
  //     })
  //   ))
  // }
  // deleteDepartment(id:number){
  //   return this.http.delete<any>(this.baseUrl+id)
  //   .pipe(map(
  //     (res=>{
  //       return res;
  //     })
  //   ))
  // }

  getAllDepartments(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(this.baseUrl);
  }

  departmentPost(department: DepartmentModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(this.baseUrl, department);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  editDepartment(id: number, department: DepartmentModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, department);
  }
}
