import { Component, OnInit } from '@angular/core';
import { EmpService } from '../service/emp.service';
import{Emp} from '../model/emp';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  emps:Emp[];
  errMsg:string;

  constructor(private empService :EmpService) { }
  ngOnInit(){
    this.loadData();
  }

  loadData() {
    this.emps=null;
    this.errMsg=null;
    this.empService.getAll().subscribe(
      (data)=>{this.emps=data;},
      (err)=>{this.errMsg='sorry server not reachable';}
    );
  }
  delete(empId:number){
    if(confirm(`Are you sure of deleting emp#${empId}`)){
      this.empService.deleteById(empId).subscribe(
        ()=>{this.loadData();},
        (err)=>{this.errMsg=err;}
      );

    }
  }

}