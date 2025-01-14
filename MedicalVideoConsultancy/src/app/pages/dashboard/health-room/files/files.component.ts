import { Patient, User, Consult } from './../../../../_model/user';
import { ActivatedRoute,Router } from '@angular/router';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileUploadService} from "../../../../_services/file-upload.service";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import { ProviderService } from './../../../../_services/provider.service';
import { MeetRoomService } from './../../../../_services/meet-room.service';
import { saveAs } from 'file-saver';
import { PatientService } from './../../../../_services/patient.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  fileName=[];
  patient:Patient;
  consultId:string;
  downloadFileList=[];
  classKey=[];
  upClassKey=[];
  downloadFile:String;
  currentUser:User;
  consultData:Consult;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef; files = [] ;
  constructor(
    private fileUploadService: FileUploadService,
    private route:ActivatedRoute,
    private providerService:ProviderService,
    private meetRoomService:MeetRoomService,
    private patientService:PatientService
    ) {
    this.route.paramMap.subscribe(async (params) => {
      this.patient = JSON.parse(localStorage.getItem(params.get("patientId")));
      this.consultId=params.get('consultId');
      this.providerService.getOneConsult(this.patient._id,this.consultId)
      .subscribe(res=>{
        this.consultData=res;
        this.downloadFileList=this.consultData.patientFiles;
        this.fileName=this.consultData.providerFiles;
      })
    });
    this.currentUser = Object.assign(new User(), JSON.parse(localStorage.getItem('provider_data')));

   }

  ngOnInit(): void {
    console.log('sdfsdf')
    this.meetRoomService.confirmConnect(this.currentUser);
   
  }
  uploadFile(file) {
    const providerId=JSON.parse(localStorage.getItem('provider_data')).id;
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('_id', providerId);
    formData.append('key', 'provider');
    file.inProgress = true;
    const fileType=file.data.type.split('/')[0];
    this.fileUploadService.uploadFile(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        setTimeout(() => {
          file.inProgress = false;
          file.progress = 0;
          this.files = [];
        }, 1000);
        this.fileName.push(event.body)
        this.meetRoomService.sendUploadFile(event.body,'provider',this.patient._id);
      }
    });
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  handleUpload() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (const f of fileUpload.files) {
        const file = f;
        this.files.push({ data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  
  changeClass(idx,key){
    if(key==='down'){
      this.initClass();
      this.classKey[idx]=true;
      this.downloadFile=this.downloadFileList[idx];
      }else{
        this.initClass();
        this.upClassKey[idx]=true;
        this.downloadFile=this.fileName[idx];
      }
    }
    initClass(){
      this.classKey=[];
      this.upClassKey=[];
      this.downloadFileList.forEach((item)=>{
        this.classKey.push(false);
      })
      this.fileName.forEach((item)=>{
        this.upClassKey.push(false);
      })
    }
   
  handleDownload(){
    console.log('this.downloadFile')
    console.log(this.downloadFile)
    if(this.downloadFile){
      this.patientService.download('file-transfer/download/consult/'+this.downloadFile)
      .subscribe(blob =>{
        saveAs(blob, this.downloadFile)} )
    }  
  }
  async ngAfterViewInit(){
    this.meetRoomService.receiveUploadFile().subscribe(uploadFileName=>{
      this.downloadFileList.push(uploadFileName);
    })
  }


}
