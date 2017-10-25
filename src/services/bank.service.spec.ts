import { ComponentFixture, TestBed, inject }          from '@angular/core/testing';
import { DebugElement }                               from '@angular/core';
import { HttpModule,
         Http,
         Response,
         ResponseOptions,
         XHRBackend }                                 from '@angular/http';
import { MockBackend, MockConnection }                from '@angular/http/testing';
import { BankService }                                from '../services/bank.service';
import { Bank }                                       from '../interfaces/bank';
import { ToastControllerMock }                        from '../mock/toastcontroller-mock';
import { ToastController }                            from 'ionic-angular';
import { ResponseType, Request, ResponseOptionsArgs } from '@angular/http';

class MockError extends Response implements Error {
    public name: any;
    public message: any;
}

describe('BankService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                BankService,
                { provide: XHRBackend, useClass: MockBackend },
                { provide: ToastController, useClass: ToastControllerMock },
            ],
        });
    });

    describe('getBanks()', () => {
        it('should return an Observable<Bank[]>', inject([BankService, XHRBackend], (_bankService, mockBackend) => {

                const banksResponse: any = {
                    success: {
                        banks: [
                            {code: '1', name: 'Banco1', db_id: 11},
                        ],
                    },
                };

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(banksResponse),
                    })));
                });

                _bankService.getBanks().subscribe(response => {
                    expect(response[0].code).toBe('1');
                    expect(response[0].name).toBe('Banco1');
                });
            }),
        );

        it('should return getBanks() error', inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {

            mockBackend.connections.subscribe((connection: MockConnection) => {
                let body: string = JSON.stringify({key: 'val'});
                let opts: ResponseOptionsArgs = {url: 'http://felipe.com', type: ResponseType.Error, status: 404, body: body, headers: null};
                let responseOpts: ResponseOptions = new ResponseOptions(opts);
                connection.mockError(new MockError(responseOpts));
            });

            _bankService.getBanks().subscribe(
                response => {
                    console.log('success');
                },
                error => {
                    expect(error.status).toBe(404);
                });
        }));
    });

    describe('create()', () => {
        it('should return create() TRUE',  inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
                const mockResponse: any = {
                    success: {
                        bank: 159,
                        message: 'm',
                    },
                };

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                      body: JSON.stringify(mockResponse),
                    })));
                });

                let s: string;
                _bankService.create(s, s).subscribe(response => {
                    expect(response).toBeTruthy();
                });
            }),
        );

        it('should return create() error', inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {

            mockBackend.connections.subscribe((connection: MockConnection) => {
                let body: string = JSON.stringify({key: 'val'});
                let opts: ResponseOptionsArgs = {url: 'http://felipe.com', type: ResponseType.Error, status: 404, body: body, headers: null};
                let responseOpts: ResponseOptions = new ResponseOptions(opts);
                connection.mockError(new MockError(responseOpts));
            });

            _bankService.create('name', 'code').subscribe(
                response => {
                    console.log('success');
                },
                error => {
                    expect(error.status).toBe(404);
                });
        }));
    });

    describe('delete()', () => {
        it('should return delete() TRUE', inject([BankService, XHRBackend], (_bankService, mockBackend) => {
                const banks: Bank[] = [
                    {code: '22', name: 'NomeDoBanco2', db_id: 22},
                    {code: '33', name: 'NomeDoBanco3', db_id: 33},
                ];
                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions ({
                        body: JSON.stringify(null),
                    })));
                });

                _bankService.delete(banks[0].db_id).subscribe(response => {
                    expect(response).toBeTruthy();
                });
            }),
        );

        it('should return delete() error', inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                let body: string = JSON.stringify({key: 'val'});
                let opts: ResponseOptionsArgs = {url: 'htttp://felipe.com', type: ResponseType.Error, status: 404, body: body, headers: null};
                let responseOpts: ResponseOptions = new ResponseOptions(opts);
                connection.mockError(new MockError(responseOpts));
            });

            _bankService.delete(1).subscribe(
                response => {
                    console.log('success');
                },
                error => {
                    expect(error.status).toBe(404);
                });
        }));
    });

    describe('update()', () => {
        it('should return update() TRUE', inject([BankService, XHRBackend], (_bankService, mockBackend) => {
                const bank: Bank = {
                    code: '22', name: 'NomeDoBanco2', db_id: 22,
                };

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions ({
                        body: JSON.stringify(null),
                    })));
                });

                _bankService.update(bank).subscribe(response => {
                    expect(response).toBeTruthy();
                });
            }),
        );

        it('should return update() error', inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
            const bank: Bank = {
                code: '22', name: 'NomeDoBanco2', db_id: 22,
            };

            mockBackend.connections.subscribe((connection: MockConnection) => {
                let body: string = JSON.stringify({key: 'val'});
                let opts: ResponseOptionsArgs = {url: 'http:felipe.com', type: ResponseType.Error, status: 404, body: body, headers: null};
                let responseOpts: ResponseOptions = new ResponseOptions(opts);
                connection.mockError(new MockError(responseOpts));
            });

            _bankService.update(bank).subscribe(
                response => {
                    console.log('success');
                },
                error => {
                    expect(error.status).toBe(404);
                });
        }));
    });
});
