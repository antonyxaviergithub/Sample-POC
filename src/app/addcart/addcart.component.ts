import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import { AlertService, AuthenticationService } from '../_services/index';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Product } from '../_models/product';
import { ProductListService } from '../_services/productlist.service';
// import { BehaviorSubject } from 'rxjs';

@Component({
   // moduleId: module.id,
   
    templateUrl: 'addcart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddCartComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    showMenu: boolean;  
    product:Product;
    productId:String;


    constructor(private userService: UserService,private router: Router, 
        private appComponent: AppComponent, 
        private route: ActivatedRoute,
        private productService: ProductListService,
        private cd:ChangeDetectorRef) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        appComponent.showMenu=true;
    }

    redirect(product) {
        
        this.router.navigate(['./addwizard',product]);
        this.cd.detectChanges();
      }

    //   redirect() {
        
    //     this.router.navigate(['./addwizard']);
    //   }
      
    ngOnInit() {
    
        this.productId = this.route.snapshot.params.id;
        
        this.productService.getById(this.productId)
        .subscribe(
            product => {       
                this.product =product;          
            });
           
        }
        
        
            
   

    // deleteUser(id: number) {
    //     this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    // }

    // private loadAllUsers() {
    //     this.userService.getAll().subscribe(users => { this.users = users; });
    // }
}