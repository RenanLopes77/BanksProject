import {ResponseOptions, Response} from '@angular/http';

export class MockError extends Response implements Error {

        public name: any;
        public message: any;

        constructor(status: number, body: string = '') {
            super(new ResponseOptions({status, body}));
        }
}
