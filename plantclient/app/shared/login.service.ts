import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {ILogin} from './login';

@Injectable()
export class LoginService {

    _loginUrl :string = 'http://localhost:1337/login';
    _accesstokenUrl: string = 'http://localhost:1337/accesstoken';

    private locationWatcher = new EventEmitter();

    constructor(private _http: Http) {

        console.log(this._http);
        console.log(this._loginUrl);
    }

    public isLoggedIn(): Observable<ILogin> {

        return this._http.get(this._loginUrl)
            .map(response => response.json())
            .do(data => console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}
