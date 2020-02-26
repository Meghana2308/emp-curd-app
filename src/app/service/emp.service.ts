import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emp } from '../model/emp';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
  baseUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.baseUrl="http://localhost:7999/emps";
  }
   
  getAll():Observable<Emp[]>{
    return this.httpClient.get<Emp[]>(this.baseUrl);
  }
  getById(empId:number):Observable<Emp>{
    return this.httpClient.get<Emp>(`${this.baseUrl}/${empId}`);
  }
  

        add(emp:Emp) : Observable<Emp>{
          return this.httpClient.post<Emp>(this.baseUrl,emp);
        }
        save(emp:Emp) : Observable<Emp>{
          return this.httpClient.post<Emp>(this.baseUrl,emp);
        }
       deleteById(empId:number):Observable<void>{
         return this.httpClient.delete<void>(`${this.baseUrl}/${empId}`);
       }
  }