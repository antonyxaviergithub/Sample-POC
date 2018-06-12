import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { AddCartComponent } from './addcart/index';
import { AddWizardComponent } from './addwizard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'homepage', component: HomeComponent },
    { path: 'addcart', component: AddCartComponent },
    { path: 'addwizard', component: AddWizardComponent },
    { path: 'addwizard/:id', component: AddWizardComponent },
    { path: 'addcart/:id', component: AddCartComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);