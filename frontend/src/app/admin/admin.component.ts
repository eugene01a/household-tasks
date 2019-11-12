import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Registration} from '../_models';
import {AuthService} from '../_services';


@Component({templateUrl: 'admin.component.html'})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Request Date', 'Name', 'Email', 'Reason', 'Action'];
  registrations: Registration[];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.pendingRegistrations().pipe(first()).subscribe(data => {
        this.registrations = data;
      }
    );
  }
}
