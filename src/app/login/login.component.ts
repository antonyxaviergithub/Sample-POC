import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { AppComponent } from '../app.component';
// import { BehaviorSubject } from 'rxjs';

@Component({
    //moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    title = '';
    model: any = {};
    loading = false;
    returnUrl: string;
    showMenu: boolean; 

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private appComponent: AppComponent
    ) {
            appComponent.showMenu = false;
         }
      
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
         // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
