import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService, AuthService, ModalService} from '../_services';
import {AppComponent} from '../app.component';
import {UserInfo} from '../_models';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  response: UserInfo;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private appComponent: AppComponent,
    public modalService: ModalService) {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }


  ngOnInit() {
    console.log("this.appComponent.isLoggedIn= "+this.appComponent.isLoggedIn)

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = '/';
  }

  closeModal() {
    this.modalService.close('login-modal');
  }

  switchModal(id) {
    this.modalService.open(id);
    this.closeModal();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.appComponent.isLoggedIn = true;
          console.log("this.appComponent.isLoggedIn= "+this.appComponent.isLoggedIn)
          this.loading = false;
          this.response = data;
          if (this.response.role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    this.modalService.close('login-modal');
  }


}
