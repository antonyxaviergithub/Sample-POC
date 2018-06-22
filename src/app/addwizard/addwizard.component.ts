import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { AppComponent } from '../app.component';
import { ProductListService } from '../_services/productlist.service';
import { ProductCheckoutDetails } from '../_models/productcheckoutdetails';
import { RequestOptions } from '@angular/http';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/filter';
// import { BehaviorSubject } from 'rxjs';

@Component({
   // moduleId: module.id,
   selector: 'app-add-wizard',
    styles: ['.form-group{text-align:left}'],
    templateUrl: 'addwizard.component.html'
})

export class AddWizardComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    products: any[];
    name: String;
    returnUrl: string;
    showContactForm:boolean = false;
    showpaymentForm:boolean = false;
    productdetails: any={};
    productsListVal: any={};
    productCheckDetails: ProductCheckoutDetails[];
    productService: ProductListService;
    productinputdetails :any = {};
    contactform: FormGroup;
    productInfo: any={};
    contactinfo: any={};
    paymentinfo: any={};
    // showMenu: boolean;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private appComponent: AppComponent,      
        private userService: UserService,
        productService: ProductListService,
        private prodList: ProductListService,
        private prodID : String,
        private prodName : String,
        private prodPrice:  String,
        private prodDesc: String,
        private fb:FormBuilder) {
        appComponent.showMenu=true;
    }

    ngOnInit() {
    //   this.productdetails = this.route.snapshot.params.id;     
      // this.productdetails = this.route.snapshot.paramMap.get('proId') ;   
      // console.log("ABABBAB "+ this.productdetails.customerName);
       this.route.queryParams
       .filter(params => params.id)
       .subscribe(params => {
        console.log(params); // {order: "popular"}
        this.prodID = params.id;
        console.log(this.prodID); // popular
        this.prodName = params.productName;
        console.log(this.prodName); 
        this.prodPrice = params.productPrice;
        console.log(this.prodPrice); 
        this.prodDesc = params.productDescription;
        console.log(this.prodDesc); 
        this.productInfo =params;
         console.log(this.productInfo);
       });
    //   console.log( this.productdetails.address2);
        this.loadAllUsers();
        this.showContactForm  = true;
        // this.contactform = this.fb.group({
        //     email: ['',[Validators.required,
        //                 Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        //     phone:['',[Validators.required, Validators.maxLength(10),
        //         Validators.pattern('[0-9]$')]],
        //     address:['',[Validators.required, Validators.maxLength(30),
        //         Validators.pattern('[a-z0-9]$')]],
        //     zipCode:['',[Validators.required, Validators.maxLength(8),
        //         Validators.pattern('[a-z0-9]$')]],
        //     city:['',[Validators.required, Validators.maxLength(15),
        //         Validators.pattern('[a-z]$')]],
        //     state:['',[Validators.required, Validators.maxLength(25),
        //         Validators.pattern('[a-z]$')]],
        //     country:['',[Validators.required, Validators.maxLength(25),
        //         Validators.pattern('[a-z]$')]]
        // });
        // this.contactform = this.fb.group({
        //     email: [''],
        //     phone:[''],
        //     address:[''],
        //     zipCode:[''],
        //     city:[''],
        //     state:[''],
        //     country:['']
        // });
     }
     register(val){
        console.log(val);
        this.contactform = val;
        this.contactinfo =val;
        // this.formdata {
            
        // }
        this.showContactForm  = false;
        this.showpaymentForm  = true;
     }
    //  next(val){
    //      console.log(val);
    //     //  this.contactform = this.fb.group({
    //     //     email: ['',[Validators.required,
    //     //                 Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    //     //     phone:['',[Validators.required, Validators.maxLength(10),
    //     //         Validators.pattern('[0-9]$')]],
    //     //     address:['',[Validators.required, Validators.maxLength(30),
    //     //         Validators.pattern('[a-z0-9]$')]],
    //     //     zipCode:['',[Validators.required, Validators.maxLength(8),
    //     //         Validators.pattern('[a-z0-9]$')]],
    //     //     city:['',[Validators.required, Validators.maxLength(15),
    //     //         Validators.pattern('[a-z]$')]],
    //     //     state:['',[Validators.required, Validators.maxLength(25),
    //     //         Validators.pattern('[a-z]$')]],
    //     //     country:['',[Validators.required, Validators.maxLength(25),
    //     //         Validators.pattern('[a-z]$')]]
    //     // });
    //     console.log(this.contactform.get("email"));
    //     console.log(this.contactform.get("phone"));
    //     console.log(this.contactform.get("address"));
    //     console.log(this.contactform.get("zipCode"));
    //     console.log(this.contactform.get("city"));
    //     console.log(this.contactform.get("state"));
    //     console.log(this.contactform.get("country"));
    //     this.showContactForm  = false;
    //     this.showpaymentForm  = true;

    //  }

     onSubmitPayment(val){
        console.log(val);
        this.paymentinfo=val;

    // customerId: number;
    // customerName: string;
    // customerEmail: string;
    // address1: string;
    // address2: string;
    // city: string;
    // state: string;
    // country: string;
    // pincode: string;
    // creditCardNo: string;
    // cardExpDate: string;
    // productlist: ProductList[]

      this.productdetails.cardExpDate=this.paymentinfo.expiryMon;
      this.productdetails.creditCardNo=this.paymentinfo.cardNumber;
      this.productdetails.customerId=1;
      this.productdetails.customerName="xavier";
      this.productdetails.customerEmail="xavier@newt.com";
      this.productdetails.address1=this.contactinfo.address;
      this.productdetails.address2=this.contactinfo.address;
      this.productdetails.city=this.contactinfo.city;
      this.productdetails.state=this.contactinfo.state;
      this.productdetails.country=this.contactinfo.country;
      this.productdetails.pincode=this.contactinfo.zipCode;
     
      this.productsListVal.productId=this.productInfo.id;
      this.productsListVal.productName=this.productInfo.productName;
      this.productsListVal.productcheckoutId=this.productInfo.id;
      this.productsListVal.checkoutOrderId=this.productInfo.id;
      console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIII"+this.productsListVal);
      this.productdetails.productlist=this.productsListVal;
      console.log("MMMMMMMMMMMMM"+this.productdetails);
      this.add (this.productdetails);
        //   this.router.navigate(['./addwizard', {id:this.productdetails} ])
       // this.productCheckDetails.customerName = this.contactInformation.name;


    }
    //  nextORG(f: NgForm){
    //     console.log(f.form.value);    
    //     console.log(f.value);
    //     console.log(f.valid);  // false
    //     this.showContactForm  = false;
    //     this.showpaymentForm  = true;
    //  }

     previous(){
        this.showContactForm  = true;
        this.showpaymentForm  = false;
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
    
    add(productdetails: ProductCheckoutDetails): void {
        
        // The server will generate the id for this new hero
          this.prodList.addCheckoutProduct(productdetails);
      }

    redirect() { 
        // console.log("REEEEE " + id);       
        this.router.navigate(['./addcart',{proId:this.prodID }]);
    }
    

    
}