import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './_services';
import { ModalService } from './_modal';


@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    noModalUrls = ['/login', '/register', '/forgot-pw'];
    isAdmin: boolean;
    isLoggedIn: boolean;
    bodyText: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        private modalService: ModalService,
    ) {
        this.authService.isAuthenticated().subscribe(data => this.isLoggedIn = data);
        this.authService.isAdmin ().subscribe(data => this.isAdmin = data);
        console.log('isLoggedIn= ' + this.isLoggedIn);
        console.log('isAdmin= ' + this.isAdmin);


    }

    ngOnInit() {
      this.bodyText = 'This text can be updated in modal 1';
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    isCurrentRoute(route: string) {
        return this.router.url === route;
    }
}
