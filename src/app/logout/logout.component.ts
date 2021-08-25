import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AlertService, AuthService, ModalService} from '../_services';
import {AppComponent} from '../app.component';

@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private modalService: ModalService,
    private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.returnUrl = '/';

  }

  onCancel() {
    this.modalService.close('logout-modal');
  }

  onSubmit() {
    this.authService.logout();
    this.modalService.close('logout-modal');
    this.appComponent.isLoggedIn = false;
    this.router.navigate([this.returnUrl]);
  }
}
