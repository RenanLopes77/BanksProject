<<<<<<< HEAD
import {ResponseOptions, Response} from '@angular/http';

export class MockError extends Response implements Error {

        public name: any;
        public message: any;

        constructor(status: number, body: string = '') {
            super(new ResponseOptions({status, body}));
        }
}
=======
import {ResponseOptions, Response} from '@angular/http';

export class MockError extends Response implements Error {

        public name: any;
        public message: any;

        constructor(status: number, body: string = '') {
            super(new ResponseOptions({status, body}));
        }
}
>>>>>>> b996b01e1d349b2328638060209450aa90898445
