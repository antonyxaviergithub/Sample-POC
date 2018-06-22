import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Product} from '../_models/product';
import { Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ProductCheckoutDetails } from '../_models/productcheckoutdetails';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../_services/http-error-handler.service';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    //   'Authorization': 'my-auth-token'
    })
  };

@Injectable()
export class ProductListService {
     urlPath = "http://localhost:8765";
     urlPath2 = "http://localhost:8766";
     product: Product;
     private handleError: HandleError;
  
    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('ProductListService');
    }
    
    getAll() {
        return this.http.get<Product[]>(this.urlPath+'/products');
    }

    productsByName(productName: String) {
        console.log("@@@"+productName);
        return this.http.get<Product>(this.urlPath+'/products/search/name/'+productName);
    }  

    getById(productId: String){
      
        return this.http.get<Product>(this.urlPath+'/products/search/id/'+productId);
    }

    addCheckoutProduct(productcheckoutdetails: ProductCheckoutDetails): void {
        
        console.log(productcheckoutdetails);
             this.http.post(this.urlPath+'/checkout/addCheckoutDetails/',productcheckoutdetails);
             console.log("successfully called");
            // .pipe(
            //     catchError(this.handleError('productcheckoutdetails', productcheckoutdetails))
            //   );
        }	

        // addHero (hero: Hero): Observable<Hero> {
        //     return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
        //       .pipe(
        //         catchError(this.handleError('addHero', hero))
        //       );
        //   }
    
        proceedToPay(customerId: String){      
            return this.http.get<any>(this.urlPath2+'/shoppingcart/OrderService/get/productList/xav/'+customerId);
        }

        addCart(customerId:number, customerName:String,productId: number, productName:String, price: number, productdesc:String ){
            return this.http.get<any>(this.urlPath2+'/shoppingcart/OrderService/create/xav/'+customerId+'/'+customerName +'/'+productId+'/'+productName+'/'+price+'/'+productdesc);  
        }

}