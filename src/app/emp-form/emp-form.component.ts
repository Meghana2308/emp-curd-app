import { Component, OnInit } from '@angular/core';
import { Emp } from '../model/emp';
import { EmpService } from '../service/emp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css']
})
export class EmpFormComponent implements OnInit {
emp:Emp;
msg:string;
isNew :boolean;
joinDateStr : string;
  constructor(
    private empService:EmpService,
    private actRoute: ActivatedRoute,
    private router :Router
  ) { }

  ngOnInit() {
    let empId = this.actRoute.snapshot.params.id;

    if(empId){
      this.isNew=false;
      this.empService.getById(empId).subscribe(
        (data) => {
          this.emp=data;
          this.joinDateStr=this.emp.joinDate.toISOString().substr(0,10);
        }
      );
    }else{
      this.isNew=true;
      this.emp={
        empId:0,
        firstName:'',
        lastName:'',
        basic:0,
        joinDate:new Date(),
        mobileNumber:'',
        email:'',
        dept:''
      };
      this.joinDateStr=this.emp.joinDate.toISOString().substr(0,10);
    }
  }
updateJoiDate(){
    this.emp.joinDate = new Date(this.joinDateStr);
}
save(){
  let ob : Observable<Emp>;
  if(this.isNew){
    ob = this.empService.add(this.emp);

  }else{
    ob=this.empService.save(this.emp);
  }
  ob.subscribe(
    (data) =>{
      this.router.navigateByUrl("");
    },
    (errResponse) => {
      this.msg=errResponse.error;
    }

  );
}
}