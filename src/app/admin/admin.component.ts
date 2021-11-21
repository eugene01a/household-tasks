import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';

import {Registration, Role} from '../_models';
import {AlertService, AuthService} from '../_services';
import {Router} from '@angular/router';


@Component({
        templateUrl: 'admin.component.html',
        styleUrls: ['admin.component.css']
    },
)
export class AdminComponent implements OnInit {
    displayedColumns: string[] = ['Select', 'Position', 'Id', 'Request Date', 'First Name', 'Last Name', 'Email', 'Reason'];
    registrations: Registration[];
    roles: Role[];
    selection = new SelectionModel<Registration>(true, []);
    action = null;
    roleId = null;

    constructor(private authService: AuthService,
                private alertService: AlertService,
                private router: Router,
    ) {
    }

    ngOnInit() {
        this.authService.pendingRegistrations().pipe(first()).subscribe(data => {
                this.registrations = data;
            }
        );
        this.authService.roles().pipe(first()).subscribe(data => {
                this.roles = data;
            }
        );
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.registrations.length;
        return numSelected === numRows;
    }

    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.registrations);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Registration): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    onApply() {
        if (this.action === 'approve') {
            this.selection.selected.forEach(reg => {
                this.authService.approve(reg['registration_id'], this.roleId).pipe(first()).subscribe(data => {
                        console.log('data ' + data);
                    },
                    error => {
                        this.alertService.error(error);
                    });
            });
        }

        if (this.action === 'deny') {
            this.selection.selected.forEach(reg => {
                    this.authService.deny(reg['registration_id']);
                }
            );
        }
        this.router.navigate([this.router.url]);
    }
}
