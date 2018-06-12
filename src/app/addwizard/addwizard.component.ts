import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { AppComponent } from '../app.component';
import { ProductListService } from '../_services/productlist.service';
// import { BehaviorSubject } from 'rxjs';

@Component({
   // moduleId: module.id,
   selector: 'app-add-wizard',
    templateUrl: 'addwizard.component.html'
})

export class AddWizardComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    products: any[];
    name: String;
    returnUrl: string;
    
    // showMenu: boolean;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private appComponent: AppComponent,      
        private userService: UserService,
        private prodList: ProductListService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        appComponent.showMenu=true;
    }

    ngOnInit() {
        this.loadAllUsers();
     }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private getAllProducts() {
        this.prodList.getAll().subscribe(products => { this.products = products; });
    }

    productlist() {
         this.prodList.productsByName(this.name)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                });
    }
    redirect(id) {
        
        this.router.navigate(['./addcart',id]);
      }
    
}