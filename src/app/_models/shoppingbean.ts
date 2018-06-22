import { ShoppingCartItems } from "./shoppingcartitems";
import { Product } from "./product";

export class ShoppingBean {
    customerId: number;
    customerName: string;
    customerEmail: string;
    creditCardNo: string;
    productId: string;
    productName: string;
    productPrice: string;
    productDescription: string;
    shoppingCartItems :ShoppingCartItems[];
    productList: Product[]; 
    address1: string;
    address2: string;
    city: string;
    state: string;
    cardCVV: string;
    country: string;
    pincode: string;
    count: number;
    totalPrice: number;
}
