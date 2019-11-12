import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, ModalService} from './_services';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  isAdmin: boolean;
  isLoggedIn: boolean;
  constructor(

    private router: Router,
    private authService: AuthService,
    private modalService: ModalService,
  ) {
    this.authService.isAuthenticated().subscribe(data => this.isLoggedIn = data);
    console.log('isLoggedIn= '+this.isLoggedIn)


  }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
