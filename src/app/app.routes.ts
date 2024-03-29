import { Routes } from '@angular/router';
import { MasterComponent } from './shared/layouts/master/master.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ComposeComponent } from './pages/compose/compose.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path:'',
        component: MasterComponent,
        children:[
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
            ,
            {
                path: 'messages', 
                component: MessagesComponent
            },
            {
                path: 'compose',
                component: ComposeComponent
            }
        ]

    }
];
