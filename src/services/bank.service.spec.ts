import { TestBed, async, inject }      from '@angular/core/testing';
import { HttpModule,
         Http,
         Response,
         ResponseOptions,
         XHRBackend }                  from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BankService }                 from '../services/bank.service';
import { Bank }                        from '../interfaces/bank';
import { ToastControllerMock }         from '../mock/toastcontroller-mock';
import { MockError }                   from '../mock/error-mock';
import { ToastController }             from 'ionic-angular';

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
    describe('create()', () => {
        it('should return an Observable<Bank[]>', inject([BankService, XHRBackend], (_bankService, mockBackend) => {

                const banksResponse: any = {
                    success: {
                        banks: [
                            {code: '1', name: 'Banco1', db_id: 11},
                        ],
                        test: 'sdfd1',
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

        it('should return an error', inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
            //COLOCAR TRATAMENTO DE ERRO AQUI
        }));
    });

    describe('create()', () => {
        it('should return TRUE',  inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
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

        it('should return an error', inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
            //COLOCAR TRATAMENTO DE ERRO AQUI
        }));
    });

    describe('delete()', () => {
        it('should return TRUE', inject([BankService, XHRBackend], (_bankService, mockBackend) => {
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

        it('should return an error', inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
            //COLOCAR TRATAMENTO DE ERRO AQUI
        }));
    });

    describe('update()', () => {
        it('should return TRUE', inject([BankService, XHRBackend], (_bankService, mockBackend) => {
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

        it('should return an error', inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
            //COLOCAR TRATAMENTO DE ERRO AQUI
        }));
    });
});
