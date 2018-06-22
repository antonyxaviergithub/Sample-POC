import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import { AlertService, AuthenticationService } from '../_services/index';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Product } from '../_models/product';
import { ProductListService } from '../_services/productlist.service';
import { ProductCheckoutDetails } from '../_models/productcheckoutdetails';
import { ProductList } from '../_models/productlist';
import { ProductStatus } from '../_models/productstatus';
import { NgForm } from '@angular/forms';
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
    prodID:String;
    productCheckDetails= {};
    productlists2 ={};
    productStatus: ProductStatus;
    productdetails :any = {};
    productlist1:any= {};
    
    
    constructor(private userService: UserService,private router: Router, 
        private appComponent: AppComponent, 
        private route: ActivatedRoute,
        private productService: ProductListService,
        private cd:ChangeDetectorRef) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        appComponent.showMenu=true;
        
    }

    addProduct(product) {
        console.log("PRODUCT ID "+product.productId);
        console.log("PRODUCT NAME "+product.productName);
        console.log("PRODUCT PR "+product.productPrice);
        console.log("PRODUCT DES "+product.productDescription);
        console.log("USER "+this.currentUser );
        
      //  this.router.navigate(['./addwizard',{id:product.productId,productName:product.productName,}]);
       this.router.navigate(['./addwizard'], { queryParams: { 'productName': product.productName, 'id':product.productId , 'productPrice': product.productPrice,'productDescription': product.productDescription} });
   
        this.cd.detectChanges();
      }

    ngOnInit() {    
        this.prodID = this.route.snapshot.paramMap.get('proId') ;
        console.log("CRT  "+this.prodID );
        this.productService.getById(this.prodID)
        .subscribe(
            product => {       
                this.product =product;          
            });           
        }
        
    // addCheckOut( ){
    //   console.log("OOOOO");
    //   console.log(this.productdetails);
      
    //   this.productdetails.customerId=1;

    //   this.productdetails.customerName="xavier";
    //   this.productdetails.customerEmail="xavier@newt.com";
    //   this.productdetails.address1="XAVIER STREET";
    //   this.productdetails.address2="JANSI STREET";
    //   console.log(this.productdetails.customerId);
    //   this.productlist1.productId=6;
    //   this.productlist1.productName="CAR";
    //   this.productlist1.productcheckoutId=123;
    //   this.productlist1.checkoutOrderId=12;
    //   console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIII"+this.productlist1);
    //   this.productdetails.productlist=this.productlist1;
      
    //   console.log("YYYYYYYYYYYYYYYYYYYY"+ this.productdetails.productlist.productName);
    //   this.productService.addCheckoutProduct(this.productdetails);
    //   this.router.navigate(['./addwizard', {id:this.productdetails} ]);
      
    //   }
       
   
      
      // deleteUser(id: number) {
    //     this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    // }

    // private loadAllUsers() {
    //     this.userService.getAll().subscribe(users => { this.users = users; });
    // }


    proceedToPay(product){

    }
}