import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from './login.service';
import { ILogin } from './login';

@Component({
    selector: 'login-component',
  templateUrl : 'app/shared/login.component.html',
})
export class LoginComponent  {

    isUserLoggedIn: boolean = false;
    errorMessage: string = '';

    constructor(private _loginService: LoginService) {

        console.log("LoginComponent.constructor");

        this._loginService.isLoggedIn()
            .subscribe(result => {console.log(result.loggedin); this.isUserLoggedIn = result.loggedin;},
                       error => this.errorMessage = <any>error);
    }

    ngOnInit(): void {
        
    }
   
}
