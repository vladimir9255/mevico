import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../../_services/patient.service';
import { ProviderService } from '../../../_services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feeback',
  templateUrl: './feeback.component.html',
  styleUrls: ['./feeback.component.css']
})
export class FeebackComponent implements OnInit {

  @Input() patientData: any;
  @Input() providerData: any;
  @Input() roomName: any;

  feedBackForm: FormGroup;

  disabledButton = false;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private _router: Router) {
    this.feedBackForm = this.formBuilder.group({
      rankingProvider: ['', [Validators.required, Validators.minLength(1)]],
      feedBackProvider: ['', [Validators.required, Validators.minLength(2)]],
      rankingApp: ['', [Validators.required, Validators.minLength(1)]],
      feedBackApp: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.feedBackForm.controls; }

  sendFeedBack() {
    if (this.feedBackForm.valid) {
      this.disabledButton = true;
      this.patientService.save(this.providerData._id, this.patientData._id, this.feedBackForm.value).subscribe((res) => {
        Swal.fire('Feedback register')
        this._router.navigateByUrl('/');
      });
    }

  }

}
