import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {AuthService} from '../_services';
import {Registration} from '../_models';


@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  userInfo: Registration[];


  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.profile().pipe(first()).subscribe(response => {
        });
  }
}
