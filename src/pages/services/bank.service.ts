import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Bank }                          from '../../interfaces/bank';
import { Observable }                    from 'rxjs/Observable';

@Injectable()
export class BankService {

    constructor(
        private http: Http,
    ) { }
    banksUrl = 'http://api.imobzi.com/v1/banks'

    getBanks(): Observable<Bank[]> {
        let myHeaders = new Headers;
        let token: string = localStorage.getItem('token');
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Authorization', token);
        return new Observable<Bank[]> (observer => {
            this.http.get(this.banksUrl, {  headers: myHeaders }).subscribe (response => {
                observer.next(response.json().success.banks as Bank[]);
            },
                error => {
                    observer.next(error);               
                }
            );
        });
    }

    create(bankName: string, bankCode: string): Observable<Boolean>{
        let myHeaders = new Headers;
        let token: string = localStorage.getItem('token');
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Authorization', token);
        let options = new RequestOptions({ headers: myHeaders });
        let params: JSON = JSON.parse('{}');
        params['name'] = bankName;
        params['code'] = bankCode;
        return new Observable<Boolean> (observer => {
            this.http.post(this.banksUrl, JSON.stringify(params), options).subscribe((response) => {
                observer.next(true);
            },
                error => {
                    observer.next(false);              
                }
            );
        });
    }

    delete(bankId: number): Observable<Boolean> {
        const url = 'http://api.imobzi.com/v1/bank/' + bankId ;
        let myHeaders = new Headers;
        let token: string = localStorage.getItem('token');
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Authorization', token);
        let options = new RequestOptions({ headers: myHeaders });
        return new Observable<Boolean> (observer => {
            this.http.delete(url, options).subscribe(() => {
                observer.next(true);
            },
                error => {
                    observer.next(false);              
                }
            );
        });
    }

    update(bank: Bank): Observable<Boolean> {
        const url = 'http://api.imobzi.com/v1/bank/' + bank.db_id ;
        let myHeaders = new Headers;
        let token: string = localStorage.getItem('token');
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Authorization', token);
        let options = new RequestOptions({ headers: myHeaders });
        let params: JSON = JSON.parse('{}');
        params['name'] = bank.name;
        params['code'] = bank.code;
        return new Observable<Boolean> (observer => {
            this.http.post(url, JSON.stringify(params), options).subscribe(() => {
                observer.next(true);
            },
                error => {
                    observer.next(false);              
                }
            );
        })
    }
}