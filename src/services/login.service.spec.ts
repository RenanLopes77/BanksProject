<<<<<<< HEAD
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DebugElement }                      from '@angular/core';
import { HttpModule,
         Http,
         Response,
         ResponseOptions,
         XHRBackend }                        from '@angular/http';
import { MockBackend }                       from '@angular/http/testing';
import { LoginService }                      from './login.service';
import { ToastController }                   from 'ionic-angular';
import { ToastControllerMock }               from '../mock/toastcontroller-mock';

describe('BankService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                LoginService,
                { provide: XHRBackend, useClass: MockBackend },
                { provide: ToastController, useCLass: ToastControllerMock },
            ],
        }).compileComponents();
    });

    describe('login()', () => {
        it('should return an Observable<Boolean>', inject([LoginService, XHRBackend], (_loginService: LoginService, mockBackend: MockBackend) => {
                const user: any = {
                    email: 'felipe@quickfast.com',
                    password: 'iquick7s@2017',
                };

                const mockResponse: any = {
                    success: {
                        success: [
                            {message: 'm', token: 'a.a.a'},
                        ],
                    },
                };

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse),
                    })));
                });

                _loginService.login(user.email, user.password).subscribe((response) => {
                    expect(response).toBeTruthy();
                });
            }),
        );

        it('should return an error', inject([LoginService, XHRBackend], (_loginService: LoginService, mockBackend: MockBackend) => {
            //COLOCAR TRATAMENTO DE ERRO AQUI
        }));
    });
});
=======
import { ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { DebugElement }                      from "@angular/core";
import { HttpModule,
         Http, 
         Response,
         ResponseOptions,
         XHRBackend }                        from "@angular/http";
import { MockBackend }                       from "@angular/http/testing";
import { LoginService }                      from "./login.service";

describe('BanksService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                LoginService,
                { provide: XHRBackend, useClass: MockBackend }
            ],
        }).compileComponents();
    });
    
    describe('login()', () => {
        it('should return an Observable<Boolean>',
            inject([LoginService, XHRBackend], (_loginService: LoginService, mockBackend: MockBackend) => {
            
                const user = {
                    email: 'felipe@quickfast.com',
                    password: 'iquick7s@2017',
                }
            
                const mockResponse = {
                    success: {
                        success: [
                            {message:'m', token:'a.a.a'}   
                        ]
                    }
                };
                                
                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                _loginService.login(user.email, user.password).subscribe((response) => {                    
                    expect(response).toBeTruthy();
                });
            })
        );

        it('should return an error', inject([BankService, XHRBackend], (_bankService: BankService, mockBackend: MockBackend) => {
            //COLOCAR TRATAMENTO DE ERRO AQUI
        }));
    });
});
>>>>>>> b996b01e1d349b2328638060209450aa90898445
