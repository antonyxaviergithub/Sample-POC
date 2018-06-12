import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { AppComponent } from '../app.component';
import { ProductListService } from '../_services/productlist.service';
import { Product } from '../_models/product';
// import { BehaviorSubject } from 'rxjs';

@Component({
   // moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    products: Array<Product>;
    resultProduct:Product;
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
        this.getAllProducts();
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

    private onSearchChange(name: String) {
        if(name=="" || name==undefined)
        this.getAllProducts();
        else{
        this.prodList.productsByName(name)
            .subscribe(
                products => {       
                    this.resultProduct = products;    
                    this.products=[];
                    this.products.push(this.resultProduct);                    
                    // this.router.navigate(['/homepage']);
                },
                error => {
                    this.alertService.error(error);
                });
            }
         
    }
    
}