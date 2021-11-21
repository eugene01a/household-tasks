import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {AuthService} from '../_services';
import {UserInfo} from '../_models';


@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
    userInfo: UserInfo;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.profile().pipe(first()).subscribe(data => {
            this.userInfo = data;
        });
    }

}
