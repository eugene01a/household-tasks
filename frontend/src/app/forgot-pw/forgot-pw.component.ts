import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService, ModalService} from '../_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.css']
})
export class ForgotPwComponent implements OnInit {
  forgotPWForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private modalService: ModalService,) {
  }

  get f() {
    return this.forgotPWForm.controls;
  }

  ngOnInit() {
    this.forgotPWForm = this.formBuilder.group({
      'email': ['', Validators.email]
    });
  }

  closeModal() {
    this.modalService.close('forgot-pw-modal');
  }

  switchModal(id) {
    this.modalService.open(id);
    this.closeModal()
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPWForm.invalid) {
      return;
    }
  }

}
