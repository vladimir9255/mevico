import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from "../../../../_services/file-upload.service";
import { catchError, map } from "rxjs/operators";
import { HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { of } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { DataService } from "../../../../_services/data.service";
import { UserService } from "../../../../_services/user.service";
import { AuthService } from "../../../../_services/auth.service";
import Swal from 'sweetalert2';

export interface PayData {
  QRimg: object[];
  account: string[];
  url: string[];
}

@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.component.html',
  styleUrls: ['./pay-method.component.css']
})
export class PayMethodComponent implements OnInit {
  publicUrl = environment.baseUrl + "public/image/";
  currentUser: any;
  payData: PayData;
  qrDesc = '';
  changeKey = true;
  displayKey: boolean = false;
  uploadImageName = [];
  QRimgKey = [];
  accountKey = false;
  urlKey = false;
  descInputKey = false;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  constructor(
    private fileUploadService: FileUploadService,
    private data: DataService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser;
    this.QRimgKey[0] = false;
    this.QRimgKey[1] = false;
  }

  ngOnInit(): void {
    this.userService.getPayData(this.currentUser.id).subscribe(res => {

      this.payData = res;
      console.log('res')
      console.log(res)
      if (res === null || res.length === 0) {
        this.payData = {
          QRimg: [],
          account: [],
          url: []
        }
      }
      if (this.payData) {
        if (this.payData.QRimg) {
          if (this.payData.QRimg[0]) {
            this.QRimgKey[0] = true;
          }
          if (this.payData.QRimg[1]) {
            this.QRimgKey[1] = true;
          }
        } else {
          this.payData.QRimg = [];
        }
        if (this.payData.account) {
          this.accountKey = true;
        } else {
          this.payData.account = [];
        }
        if (this.payData.url) {
          this.urlKey = true;
        } else {
          this.payData.url = []
        }
      }
    })
  }
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('key', 'qrImage');
    file.inProgress = true;
    this.fileUploadService.upload(formData).pipe(
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
          if (this.payData) {
            if (this.payData.QRimg && this.payData.QRimg.length >= 2) {
              return
            } else {
              this.payData.QRimg.push({ name: event.body.location, description: this.qrDesc });
              if (this.payData.QRimg[0]) {
                this.QRimgKey[0] = true;
              }
              if (this.payData.QRimg[1]) {
                this.QRimgKey[1] = true;
              }
            }
          }
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  handleUpload(qrDesc) {
    if (qrDesc === '') {
      this.descInputKey = true;
      return;
    }
    this.descInputKey = false;
    if (this.payData && this.payData.QRimg && this.payData.QRimg.length >= 2)
      return;
    this.qrDesc = qrDesc;
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (const f of fileUpload.files) {
        const file = f;
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  AddAcount(back, account) {
    if (back !== '' && account !== '')
      this.payData.account.push(back + '-' + account);
    if (this.payData.account)
      this.accountKey = true;
  }

  AddUrl(url) {
    if (url !== '')
      this.payData.url.push(url);
    if (this.payData.url)
      this.urlKey = true;
  }

  RemoveItem(idx, key) {
    if (key === 'accountKey')
      this.payData.account.splice(idx, 1);
    else if (key === 'urlKey') {
      this.payData.url.splice(idx, 1);
    }
    else if (key === 'qr') {
      this.QRimgKey[idx] = false;
      this.payData.QRimg.splice(idx, 1);
    }
  }

  Update() {
    // this.data.changeMessage(this.payData);
    this.userService.updatePayment(this.payData, this.currentUser.id).subscribe(res => {
      if (res) {
        Swal.fire('Updated successfully');
      }
    })
  }

}
