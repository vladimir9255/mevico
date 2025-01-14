
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MustMatch} from "../../../../_helpers/must-match.validator";
import { UserService } from './../../../../_services/user.service';
import Swal from 'sweetalert2';
import {MatDialog, MatTable, MatPaginator, MatTableDataSource, MatSort} from "@angular/material";

export interface PaymentData {
  id: string;
  date: string;
  amount: string;
  x:string;
  email: string;
  type: string;
}

@Component({
  selector: 'app-super-update',
  templateUrl: './super-update.component.html',
  styleUrls: ['./super-update.component.css']
})
export class SuperUpdateComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'amount', 'x', 'email', 'type'];
  noDataToDisplay: boolean = false;

  registerTitle:String;
  registerForm:FormGroup;
  passwordForm:FormGroup;
  submitted=false;
  passSubmitted=false;
  isDuplicatedRoom: boolean = false;
  isPending: boolean = false;
  isDuplicatedEmail:boolean = false;
  isDuplicatedPhone: boolean = false;
  isValidNumber: boolean = true;
  isEmptyPhoneNumber: boolean = false;
  phoneNumber:string = '';
  formData:any;
  userId:any;
  data=[
    {
      id:'234',
      date:'2020-09-09',
      amount:'59',
      x:'324234',
      email:'sdf@sdf.com',
      type:'Subscription'
    }
  ];
  dataSource:any;

  @ViewChild(MatTable)  table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService:UserService
    ) {
    this.route.params.subscribe(data=>{
      if(data.data==='new'){
        this.registerTitle="New"
      }else{
        this.userService.getUserById(data.data).subscribe(res=>{
          this.registerTitle="Update";
          this.formData=res;
          this.userId=this.formData._id;
          this.registerForm = this.formBuilder.group({
            firstName: [this.formData? this.formData.firstName:'', [Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(100)]],
            lastName: [this.formData? this.formData.lastName:'', [Validators.required,Validators.pattern("[a-zA-Z ]*"),Validators.maxLength(100)]],
            room: [this.formData? this.formData.room:'', [Validators.required,Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(40)]],
            cmp: [this.formData? this.formData.cmp:'', [Validators.required,Validators.pattern("[0-9]*"), Validators.minLength(4), Validators.maxLength(8)]],
            email: [this.formData? this.formData.email:'', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),Validators.maxLength(100)]],
            phoneNumber: [this.formData? this.formData.phoneNumber:'', Validators.required],
            speciality: [this.formData? this.formData.speciality:'', Validators.required],
          });
        })
      }
    })
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [this.formData? this.formData.firstName:'', [Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(100)]],
      lastName: [this.formData? this.formData.lastName:'', [Validators.required,Validators.pattern("[a-zA-Z ]*"),Validators.maxLength(100)]],
      room: [this.formData? this.formData.room:'', [Validators.required,Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(40)]],
      cmp: [this.formData? this.formData.cmp:'', [Validators.required,Validators.pattern("[0-9]*"), Validators.minLength(4), Validators.maxLength(8)]],
      email: [this.formData? this.formData.email:'', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),Validators.maxLength(100)]],
      phoneNumber: [this.formData? this.formData.phoneNumber:'', Validators.required],
      speciality: [this.formData? this.formData.speciality:'', Validators.required],
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.initTableData();
  }
  get f() { return this.registerForm.controls; }
  get f1() { return this.passwordForm.controls; }

  initTableData(){
    const paymentData: PaymentData[] = [];
    this.data.forEach(function(item){
      if(item) {
        paymentData.push({id: item.id, date:item.date,amount:item.amount,x:item.x,email:item.email,type:item.type});
      }
    });
    this.dataSource = new MatTableDataSource<PaymentData>(paymentData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.noDataToDisplay = true;
  }

  onSubmit(){
    this.submitted=true;
    this.isEmptyPhoneNumber = !this.registerForm.value.phoneNumber;
    // stop here if form is invalid
    if (this.registerForm.invalid || !this.isValidNumber || this.isEmptyPhoneNumber) {
      return;
    }

    if(this.formData){
      this.userService.updateProfile(this.registerForm.value,this.userId).subscribe(res=>{
        if(res){
          Swal.fire('Updated Successfully!')
          this.submitted=false;
                  
        }
      })
    }else{
      this.userService.createUser(this.registerForm.value).subscribe(res=>{
        if(res){
          this.userId=res._id;
          Swal.fire('Inserted Successfully!')
          this.submitted=false;
        }
      })
    }
  }
  onPassSubmit(){
    this.passSubmitted=true;
    if (this.passwordForm.invalid) {
      return;
    }

    if(this.userId){
      this.userService.updateProfile(this.passwordForm.value,this.userId).subscribe(res=>{
        if(res){
          Swal.fire('Updated Successfully!')
          this.passSubmitted=false;
        }
      })
    }else{
      Swal.fire('Please Register First!')
    }
  }

  hasError(event: boolean) {
    this.isValidNumber = event;
  }

  getNumber(phoneNumber: any) {
    console.log("entered number>>>>>>>>",phoneNumber );
    this.phoneNumber = phoneNumber;
    return this.phoneNumber;
  }

  telInputObject(event: any) {
    console.log("input object >>>>>>>>>>", event)
  }

  onCountryChange(event: any) {
    console.log("change number >>>>>>>>>>>>>>", event)
  }

}
