import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Toast, ToastController }        from 'ionic-angular';
import { Observable }                    from 'rxjs/Observable';
import { Bank }                          from '../interfaces/bank';

@Injectable()
export class BankService {

    private banksUrl: string = 'http://api.imobzi.com/v1/banks';

    constructor(
        private http: Http,
        private toastCtrl: ToastController,
    ) { }

    private getHttpHeaders(): Headers {
        let myHeaders: Headers = new Headers;
        let token: string = localStorage.getItem('token');
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Authorization', token);
        return myHeaders;
    }

    public getBanks(): Observable<Bank[]> {
        return new Observable<Bank[]>(observer => {
            this.http.get(this.banksUrl, { headers: this.getHttpHeaders() }).subscribe(
                response => {
                    observer.next(response.json().success.banks as Bank[]);
                },
                error => {
                    this.errorToast(error.status);
                    observer.error(error);
                },
            );
        });
    }

    public create(bankName: string, bankCode: string): Observable<Boolean> {
        let params: JSON = JSON.parse('{}');
        params['name'] = bankName;
        params['code'] = bankCode;
        return new Observable<Boolean> (observer => {
            this.http.post(this.banksUrl, JSON.stringify(params), { headers: this.getHttpHeaders() }).subscribe(
                response => {
                    observer.next(true);
                },
                error => {
                    this.errorToast(error.status);
                    observer.error(error);
                },
            );
        });
    }

    public delete(bankId: number): Observable<Boolean> {
        const url: string = 'http://api.imobzi.com/v1/bank/' + bankId ;
        return new Observable<Boolean> (observer => {
            this.http.delete(url, { headers: this.getHttpHeaders() }).subscribe(
                response => {
                    observer.next(true);
                },
                error => {
                    this.errorToast(error.status);
                    observer.error(error);
                },
            );
        });
    }

    public update(bank: Bank): Observable<Boolean> {
        const url: string = 'http://api.imobzi.com/v1/bank/' + bank.db_id ;
        let params: JSON = JSON.parse('{}');
        params['name'] = bank.name.trim();
        params['code'] = bank.code.trim();
        return new Observable<Boolean> (observer => {
            this.http.post(url, JSON.stringify(params), { headers: this.getHttpHeaders() }).subscribe(
                response => {
                    observer.next(true);
                },
                error => {
                    this.errorToast(error.status);
                    observer.error(error);
                },
            );
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
