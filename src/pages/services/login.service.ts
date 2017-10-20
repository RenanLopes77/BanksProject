import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable }                    from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private http: Http) { }
    loginUrl = 'http://api.imobzi.com/v1/login';

    login(email: string, password: string): Observable<Boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let params: JSON = JSON.parse('{}');
        params['email'] = email;
        params['password'] = password;
        // params['email'] = 'eduardo@quickfast.com';
        // params['password'] = 'iquick7s@2017';
        params['device'] = 'core';
        return new Observable<Boolean>(observer => {
            this.http.post(this.loginUrl, JSON.stringify(params), options).subscribe(response => {
                localStorage.setItem('token', response.json().success.token);
                observer.next(true);
            },
                error => observer.next(false)
            );
        });
    }
}