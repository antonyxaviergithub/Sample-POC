import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { routing }       from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AppComponent } from './app.component';
import { AddCartComponent } from './addcart/index';
import { AddWizardComponent } from './addwizard';
import { ProductListService } from './_services/productlist.service';
import { MessageService } from './_services/message.service';
import { HttpErrorHandler } from './_services/http-error-handler.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddCartComponent,
    AddWizardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [  AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ProductListService,
    MessageService,
    HttpErrorHandler,
    
    {
        provide: HTTP_INTERCEPTORS,
        
        useClass: JwtInterceptor,
        multi: true
    }, {provide: String, useValue: "dummy"},

    // provider used to create fake backend
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }



