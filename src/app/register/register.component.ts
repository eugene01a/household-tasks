import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService, AuthService} from '../_services';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService) {
    }

    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        console.log(Date.now() + '\t ngOnInit() was run');
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            reason: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        console.log(Date.now() + "\tLoading is " + this.loading)
        console.log(Date.now() + "\tSubmitted is " + this.submitted)
        console.log(Date.now() + "\t Invalid is " + this.registerForm.invalid)

        console.log(Date.now() + "\t onSubmit() was run");
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            console.log(Date.now() + '\t Form is invalid!');
            return;
        }
        this.loading = true;
        this.authService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                });
        console.log(Date.now() + '\tAuth service called, setting loading to false');
        this.loading = false;
        console.log(this);
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }


}
