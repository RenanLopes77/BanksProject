import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Toast, ToastController }        from 'ionic-angular';
import { Observable }                    from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(
        private http: Http,
        private toastCtrl: ToastController,
    ) { }
    private loginUrl: string = 'http://api.imobzi.com/v1/login';

    public login(email: string, password: string): Observable<Boolean> {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        let options: RequestOptions = new RequestOptions({ headers: headers });
        let params: JSON = JSON.parse('{}');
        params['email'] = email;
        params['password'] = password;
        // params['email'] = 'eduardo@quickfast.com';
        // params['password'] = 'iquick7s@2017';
        params['device'] = 'core';
        return new Observable<Boolean>(observer => {
            this.http.post(this.loginUrl, JSON.stringify(params), options).subscribe(response => {
                localStorage.setItem('token', response.json().success.token);
                observer.next(true),
                error => {
                    observer.next(false);
                    console.log(error);
                    this.errorToast(error.status);
                };
            });
        });
    }

    private errorToast(errorCode: string): void {
        const toast: Toast = this.toastCtrl.create({
            message: 'Could not complete the operation, error: ' + errorCode,
            duration: 2500,
            position: 'middle',
        });
        toast.present();
    }
}
