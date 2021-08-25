import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService, AuthService} from '../_services';
import {first} from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'forgot-pw',
  templateUrl: './forgot-pw.component.html',
})
export class ForgotPwComponent implements OnInit {
  forgotPWForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  get f() {
    return this.forgotPWForm.controls;
  }

  ngOnInit() {
    this.forgotPWForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    event.preventDefault();
    this.loading = true;
    this.submitted = true;

    if (this.forgotPWForm.invalid) {
      this.loading = false;
      return;
    }

    this.authService.forgot_pw(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('If email exists, an email will be sent with instructions to reset your password.', true);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          return false;
        });
  }
}
