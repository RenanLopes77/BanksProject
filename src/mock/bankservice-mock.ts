import { Observable } from 'rxjs/Observable';
import { Bank }       from '../interfaces/bank';

let banks: Bank[] = [
    {
        code: '111',
        name: 'MeuBanco',
        db_id: 111,
    },
];

export class BankServiceMock {

    public getBanks(): Observable<Bank[]> {
        return new Observable<Bank[]>( observer => {
            observer.next(banks);
        });
    }

    public create(): Observable<Boolean> {
        return new Observable<boolean>(observer => {
            observer.next(true);
        });
    }

    public delete(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            observer.next(true);
        });
    }

    public update(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            observer.next(true);
        });
    }
}
