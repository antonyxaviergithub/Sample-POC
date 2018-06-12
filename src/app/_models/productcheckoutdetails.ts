import { ProductList } from "./productlist";

export class ProductCheckoutDetails {
    customerId: number;
    customerName: string;
    customerEmail: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    creditCardNo: string;
    cardExpDate: string;
    productlist: ProductList[]; 
}